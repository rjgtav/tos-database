import FlexSearch, {CreateOptions} from "flexsearch";
import {TOSLanguage} from "../../../tos-web/src/app/shared/domain/tos-language";
import {V2TOSDataSet} from "../../../tos-web/src/app/shared/domain/tos-dataset";
import {FlexSearchEnum, FlexSearchEnum$Id} from "../domain/flexsearch-enum";

export abstract class FlexSearchService {

    public static index(language: TOSLanguage) {
        let options: CreateOptions | any = {
            doc: {
                id: '$',
                field: ['Name']
            },
            resolution: 1,
            threshold: 0,
        };

        switch (language) {
            case TOSLanguage.English:       options = this.optionsEnglish(options); break;
            case TOSLanguage.German:        options = this.optionsGerman(options); break;
            case TOSLanguage.Indonesian:    options = this.optionsIndonesian(options); break;
            case TOSLanguage.Japanese:      options = this.optionsJapanese(options); break;
            case TOSLanguage.Korean:        options = this.optionsKorean(options); break;
            case TOSLanguage.Portuguese:    options = this.optionsPortuguese(options); break;
            case TOSLanguage.Russian:       options = this.optionsRussian(options); break;
            case TOSLanguage.Taiwanese:     options = this.optionsTaiwanese(options); break;
        }

        return FlexSearch.create(options);
    }

    public static indexExport(index): string {
        index = JSON.parse(index.export());
        index[0].pop();
        index[1] = Object
            .keys(index[1])
            .map(value => index[1][value] as FlexSearchEntry)
            .reduce((accumulator, value) => {
                // Group by dataset
                accumulator[value.$dataset] = accumulator[value.$dataset] || [];
                accumulator[value.$dataset].push(value);

                // Remove dataset value to save space
                delete value.$dataset;

                return accumulator;
            }, {});

        // Include Enums and Keys mappings
        index[1] = {
            data: index[1],
            enum: FlexSearchEnum.indexExport(),
        };

        return JSON.stringify(index);
    }
    public static indexImport(index, json: object | string) {
        json = typeof json == 'string' ? JSON.parse(json) : json;

        FlexSearchEnum.indexImport(json[1].enum);

        let data = json[1].data;
        let keys = FlexSearchEnum.values(FlexSearchEnum$Id.Document$Key).map(value => value.value);

        data = Object
            .keys(data)
            .map(dataset => data[dataset].map(json => {
                let doc = {} as FlexSearchEntry;
                    doc.$dataset = dataset as V2TOSDataSet;

                Object
                    .keys(json)
                    .forEach(k => {
                        // Process each key value, including enums
                        let key = keys[parseInt(k, 36)];
                        let keyEnum: FlexSearchEnum$Id = null;

                        if (key.indexOf('|') > 0) {
                            keyEnum = +key.split('|')[1];
                            key = key.split('|')[0];
                        }

                        let valueEnum = FlexSearchEnum.values(keyEnum);
                        let value = keyEnum != undefined
                            ? Array.isArray(json[k]) ? json[k].map(v => valueEnum[parseInt(v, 36)].value) : valueEnum[parseInt(json[k], 36)].value
                            : json[k];

                        doc[key] = Array.isArray(value) || isNaN(+value) ? value : +value;
                    });

                return doc;
            }));

        json[1] = []
            .concat.apply([], data)                                     // Flatten 2D array
            .reduce((acc, value, i) => { acc[i] = value; return acc }, {});    // Map as ID -> Value

        json[0].push(Object.keys(json[1]).map(value => '@' + value));

        index.import(JSON.stringify(json));

        return index;
    }

    public static indexSearch(index, query: string) {
        console.time('search');
        query = query.toLowerCase();

        let sort = (a, b) => {
            a = sortScore(a.Name.toLowerCase());
            b = sortScore(b.Name.toLowerCase());

            return a - b;
        };
        let sortScore = (a) => {
            let index = a.indexOf(query);
                index = index < 0 ? a.length : index;

            return index / a.length * 100 + a.length / query.length * 10;
        };

        let results = index.search({ field: 'Name', limit: 100, query, sort });
        console.timeEnd('search');

        return results;
    }
    public static indexWhere(index, dataset: V2TOSDataSet, pageable: FlexSearchPageable<FlexSearchEntry>): FlexSearchPageable<FlexSearchEntry> {
        console.time('where');
        let page = pageable.page || 1;
        let pageSize = pageable.pageSize || 15;

        let sort = (pageable.sort && pageable.sort.column) || 'ClassID';
        let sortOrder = (pageable.sort && pageable.sort.order) || FlexSearchPageable$SortOrder.ASC;

        let where = (value: FlexSearchEntry) => value.$dataset === dataset && (pageable.filter || (() => true))(value);
        let result: FlexSearchEntry[];

        if (pageable.search && pageable.search.length > 1) {
            result = index.search({ field: 'Name', query: pageable.search.toLowerCase() });
            result = result.filter(value => where(value));
        } else {
            result = index.where(where);
        }

        let content = result.sort((a, b) => (a[sort] < b[sort] ? -1 : a[sort] > b[sort] ? 1 : 0) * sortOrder);
            content = result.slice((page - 1) * pageSize, page * pageSize);

        console.timeEnd('where');
        return Object.assign(pageable, {
            content,
            page,
            pageSize,
            pageTotal: Math.ceil(result.length / pageSize)
        });
    }

    private static optionsEnglish(options: CreateOptions): CreateOptions {
        return Object.assign(options, {
            // https://github.com/nextapps-de/flexsearch#encoders
            encode: 'simple',

            // http://www.ranks.nl/stopwords/
            filter: ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"],

            // https://github.com/nextapps-de/flexsearch/blob/master/lang/en.js
            stemmer: { "ational": "ate", "iveness": "ive", "fulness": "ful", "ousness": "ous", "ization": "ize", "tional": "tion", "biliti": "ble", "icate": "ic", "ative": "", "alize": "al", "iciti": "ic", "entli": "ent", "ousli": "ous", "alism": "al", "ation": "ate", "aliti": "al", "iviti": "ive", "ement": "", "enci": "ence", "anci": "ance", "izer": "ize", "alli": "al", "ator": "ate", "logi": "log", "ical": "ic", "ance": "", "ence": "", "ness": "", "able": "", "ible": "", "ment": "", "eli": "e", "bli": "ble", "ful": "", "ant": "", "ent": "", "ism": "", "ate": "", "iti": "", "ous": "", "ive": "", "ize": "", "al": "", "ou": "", "er": "", "ic": "" },

            // https://github.com/nextapps-de/flexsearch#tokenizer
            tokenize: 'forward',
        });
    }
    private static optionsGerman(options: CreateOptions): CreateOptions {
        return Object.assign(options, {
            // https://github.com/nextapps-de/flexsearch#encoders
            encode: 'icase',

            // http://www.ranks.nl/stopwords/
            filter: ['aber', 'als', 'am', 'an', 'auch', 'auf', 'aus', 'bei', 'bin', 'bis', 'bist', 'da', 'dadurch', 'daher', 'darum', 'das', 'daß', 'dass', 'dein', 'deine', 'dem', 'den', 'der', 'des', 'dessen', 'deshalb', 'die', 'dies', 'dieser', 'dieses', 'doch', 'dort', 'du', 'durch', 'ein', 'eine', 'einem', 'einen', 'einer', 'eines', 'er', 'es', 'euer', 'eure', 'für', 'hatte', 'hatten', 'hattest', 'hattet', 'hier', 'hinter', 'ich', 'ihr', 'ihre', 'im', 'in', 'ist', 'ja', 'jede', 'jedem', 'jeden', 'jeder', 'jedes', 'jener', 'jenes', 'jetzt', 'kann', 'kannst', 'können', 'könnt', 'machen', 'mein', 'meine', 'mit', 'muß', 'mußt', 'musst', 'müssen', 'müßt', 'nach', 'nachdem', 'nein', 'nicht', 'nun', 'oder', 'seid', 'sein', 'seine', 'sich', 'sie', 'sind', 'soll', 'sollen', 'sollst', 'sollt', 'sonst', 'soweit', 'sowie', 'und', 'unser', 'unsere', 'unter', 'vom', 'von', 'vor', 'wann', 'warum', 'was', 'weiter', 'weitere', 'wenn', 'wer', 'werde', 'werden', 'werdet', 'weshalb', 'wie', 'wieder', 'wieso', 'wir', 'wird', 'wirst', 'wo', 'woher', 'wohin', 'zu', 'zum', 'zur', 'über'],

            // https://github.com/nextapps-de/flexsearch/blob/master/lang/de.js
            stemmer: { "niss": "", "isch": "", "lich": "", "heit": "", "keit": "", "end": "", "ung": "", "est": "", "ern": "", "em": "", "er": "", "en": "", "es": "", "st": "", "ig": "", "ik": "", "e": "", "s": "" },

            // https://github.com/nextapps-de/flexsearch#tokenizer
            tokenize: 'forward'
        })
    }
    private static optionsIndonesian(options: CreateOptions): CreateOptions {
        return Object.assign(options, {
            // https://github.com/nextapps-de/flexsearch#encoders
            encode: 'icase',

            // http://www.ranks.nl/stopwords/indonesian
            filter: ['ada', 'adanya', 'adalah', 'adapun', 'agak', 'agaknya', 'agar', 'akan', 'akankah', 'akhirnya', 'aku', 'akulah', 'amat', 'amatlah', 'anda', 'andalah', 'antar', 'diantaranya', 'antara', 'antaranya', 'diantara', 'apa', 'apaan', 'mengapa', 'apabila', 'apakah', 'apalagi', 'apatah', 'atau', 'ataukah', 'ataupun', 'bagai', 'bagaikan', 'sebagai', 'sebagainya', 'bagaimana', 'bagaimanapun', 'sebagaimana', 'bagaimanakah', 'bagi', 'bahkan', 'bahwa', 'bahwasanya', 'sebaliknya', 'banyak', 'sebanyak', 'beberapa', 'seberapa', 'begini', 'beginian', 'beginikah', 'beginilah', 'sebegini', 'begitu', 'begitukah', 'begitulah', 'begitupun', 'sebegitu', 'belum', 'belumlah', 'sebelum', 'sebelumnya', 'sebenarnya', 'berapa', 'berapakah', 'berapalah', 'berapapun', 'betulkah', 'sebetulnya', 'biasa', 'biasanya', 'bila', 'bilakah', 'bisa', 'bisakah', 'sebisanya', 'boleh', 'bolehkah', 'bolehlah', 'buat', 'bukan', 'bukankah', 'bukanlah', 'bukannya', 'cuma', 'percuma', 'dahulu', 'dalam', 'dan', 'dapat', 'dari', 'daripada', 'dekat', 'demi', 'demikian', 'demikianlah', 'sedemikian', 'dengan', 'depan', 'di', 'dia', 'dialah', 'dini', 'diri', 'dirinya', 'terdiri', 'dong', 'dulu', 'enggak', 'enggaknya', 'entah', 'entahlah', 'terhadap', 'terhadapnya', 'hal', 'hampir', 'hanya', 'hanyalah', 'harus', 'haruslah', 'harusnya', 'seharusnya', 'hendak', 'hendaklah', 'hendaknya', 'hingga', 'sehingga', 'ia', 'ialah', 'ibarat', 'ingin', 'inginkah', 'inginkan', 'ini', 'inikah', 'inilah', 'itu', 'itukah', 'itulah', 'jangan', 'jangankan', 'janganlah', 'jika', 'jikalau', 'juga', 'justru', 'kala', 'kalau', 'kalaulah', 'kalaupun', 'kalian', 'kami', 'kamilah', 'kamu', 'kamulah', 'kan', 'kapan', 'kapankah', 'kapanpun', 'dikarenakan', 'karena', 'karenanya', 'ke', 'kecil', 'kemudian', 'kenapa', 'kepada', 'kepadanya', 'ketika', 'seketika', 'khususnya', 'kini', 'kinilah', 'kiranya', 'sekiranya', 'kita', 'kitalah', 'kok', 'lagi', 'lagian', 'selagi', 'lah', 'lain', 'lainnya', 'melainkan', 'selaku', 'lalu', 'melalui', 'terlalu', 'lama', 'lamanya', 'selama', 'selama', 'selamanya', 'lebih', 'terlebih', 'bermacam', 'macam', 'semacam', 'maka', 'makanya', 'makin', 'malah', 'malahan', 'mampu', 'mampukah', 'mana', 'manakala', 'manalagi', 'masih', 'masihkah', 'semasih', 'masing', 'mau', 'maupun', 'semaunya', 'memang', 'mereka', 'merekalah', 'meski', 'meskipun', 'semula', 'mungkin', 'mungkinkah', 'nah', 'namun', 'nanti', 'nantinya', 'nyaris', 'oleh', 'olehnya', 'seorang', 'seseorang', 'pada', 'padanya', 'padahal', 'paling', 'sepanjang', 'pantas', 'sepantasnya', 'sepantasnyalah', 'para', 'pasti', 'pastilah', 'per', 'pernah', 'pula', 'pun', 'merupakan', 'rupanya', 'serupa', 'saat', 'saatnya', 'sesaat', 'saja', 'sajalah', 'saling', 'bersama', 'sama', 'sesama', 'sambil', 'sampai', 'sana', 'sangat', 'sangatlah', 'saya', 'sayalah', 'se', 'sebab', 'sebabnya', 'sebuah', 'tersebut', 'tersebutlah', 'sedang', 'sedangkan', 'sedikit', 'sedikitnya', 'segala', 'segalanya', 'segera', 'sesegera', 'sejak', 'sejenak', 'sekali', 'sekalian', 'sekalipun', 'sesekali', 'sekaligus', 'sekarang', 'sekarang', 'sekitar', 'sekitarnya', 'sela', 'selain', 'selalu', 'seluruh', 'seluruhnya', 'semakin', 'sementara', 'sempat', 'semua', 'semuanya', 'sendiri', 'sendirinya', 'seolah', 'seperti', 'sepertinya', 'sering', 'seringnya', 'serta', 'siapa', 'siapakah', 'siapapun', 'disini', 'disinilah', 'sini', 'sinilah', 'sesuatu', 'sesuatunya', 'suatu', 'sesudah', 'sesudahnya', 'sudah', 'sudahkah', 'sudahlah', 'supaya', 'tadi', 'tadinya', 'tak', 'tanpa', 'setelah', 'telah', 'tentang', 'tentu', 'tentulah', 'tentunya', 'tertentu', 'seterusnya', 'tapi', 'tetapi', 'setiap', 'tiap', 'setidaknya', 'tidak', 'tidakkah', 'tidaklah', 'toh', 'waduh', 'wah', 'wahai', 'sewaktu', 'walau', 'walaupun', 'wong', 'yaitu', 'yakni', 'yang'],

            // https://github.com/nextapps-de/flexsearch#tokenizer
            tokenize: 'forward'
        });
    }
    private static optionsJapanese(options: CreateOptions): CreateOptions {
        return Object.assign(options, {
            // https://github.com/nextapps-de/flexsearch#encoders
            encode: 'icase',

            // http://www.ranks.nl/stopwords/japanese
            filter: ['これ', 'それ', 'あれ', 'この', 'その', 'あの', 'ここ', 'そこ', 'あそこ', 'こちら', 'どこ', 'だれ', 'なに', 'なん', '何', '私', '貴方', '貴方方', '我々', '私達', 'あの人', 'あのかた', '彼女', '彼', 'です', 'あります', 'おります', 'います', 'は', 'が', 'の', 'に', 'を', 'で', 'え', 'から', 'まで', 'より', 'も', 'どの', 'と', 'し', 'それで', 'しかし'],

            // Match individual characters so we can provide a 'forward' tokenization
            tokenize: text => text.match(/[^\s]/g)
        });
    }
    private static optionsKorean(options: CreateOptions): CreateOptions {
        return Object.assign(options, {
            // https://github.com/nextapps-de/flexsearch#encoders
            encode: 'icase',

            // http://www.ranks.nl/stopwords/korean
            filter: ['아', '휴', '아이구', '아이쿠', '아이고', '어', '나', '우리', '저희', '따라', '의해', '을', '를', '에', '의', '가', '으로', '로', '에게', '뿐이다', '의거하여', '근거하여', '입각하여', '기준으로', '예하면', '예를 들면', '예를 들자면', '저', '소인', '소생', '저희', '지말고', '하지마', '하지마라', '다른', '물론', '또한', '그리고', '비길수 없다', '해서는 안된다', '뿐만 아니라', '만이 아니다', '만은 아니다', '막론하고', '관계없이', '그치지 않다', '그러나', '그런데', '하지만', '든간에', '논하지 않다', '따지지 않다', '설사', '비록', '더라도', '아니면', '만 못하다', '하는 편이 낫다', '불문하고', '향하여', '향해서', '향하다', '쪽으로', '틈타', '이용하여', '타다', '오르다', '제외하고', '이 외에', '이 밖에', '하여야', '비로소', '한다면 몰라도', '외에도', '이곳', '여기', '부터', '기점으로', '따라서', '할 생각이다', '하려고하다', '이리하여', '그리하여', '그렇게 함으로써', '하지만', '일때', '할때', '앞에서', '중에서', '보는데서', '으로써', '로써', '까지', '해야한다', '일것이다', '반드시', '할줄알다', '할수있다', '할수있어', '임에 틀림없다', '한다면', '등', '등등', '제', '겨우', '단지', '다만', '할뿐', '딩동', '댕그', '대해서', '대하여', '대하면', '훨씬', '얼마나', '얼마만큼', '얼마큼', '남짓', '여', '얼마간', '약간', '다소', '좀', '조금', '다수', '몇', '얼마', '지만', '하물며', '또한', '그러나', '그렇지만', '하지만', '이외에도', '대해 말하자면', '뿐이다', '다음에', '반대로', '반대로 말하자면', '이와 반대로', '바꾸어서 말하면', '바꾸어서 한다면', '만약', '그렇지않으면', '까악', '툭', '딱', '삐걱거리다', '보드득', '비걱거리다', '꽈당', '응당', '해야한다', '에 가서', '각', '각각', '여러분', '각종', '각자', '제각기', '하도록하다', '와', '과', '그러므로', '그래서', '고로', '한 까닭에', '하기 때문에', '거니와', '이지만', '대하여', '관하여', '관한', '과연', '실로', '아니나다를가', '생각한대로', '진짜로', '한적이있다', '하곤하였다', '하', '하하', '허허', '아하', '거바', '와', '오', '왜', '어째서', '무엇때문에', '어찌', '하겠는가', '무슨', '어디', '어느곳', '더군다나', '하물며', '더욱이는', '어느때', '언제', '야', '이봐', '어이', '여보시오', '흐흐', '흥', '휴', '헉헉', '헐떡헐떡', '영차', '여차', '어기여차', '끙끙', '아야', '앗', '아야', '콸콸', '졸졸', '좍좍', '뚝뚝', '주룩주룩', '솨', '우르르', '그래도', '또', '그리고', '바꾸어말하면', '바꾸어말하자면', '혹은', '혹시', '답다', '및', '그에 따르는', '때가 되어', '즉', '지든지', '설령', '가령', '하더라도', '할지라도', '일지라도', '지든지', '몇', '거의', '하마터면', '인젠', '이젠', '된바에야', '된이상', '만큼	어찌됏든', '그위에', '게다가', '점에서 보아', '비추어 보아', '고려하면', '하게될것이다', '일것이다', '비교적', '좀', '보다더', '비하면', '시키다', '하게하다', '할만하다', '의해서', '연이서', '이어서', '잇따라', '뒤따라', '뒤이어', '결국', '의지하여', '기대여', '통하여', '자마자', '더욱더', '불구하고', '얼마든지', '마음대로', '주저하지 않고', '곧', '즉시', '바로', '당장', '하자마자', '밖에 안된다', '하면된다', '그래', '그렇지', '요컨대', '다시 말하자면', '바꿔 말하면', '즉', '구체적으로', '말하자면', '시작하여', '시초에', '이상', '허', '헉', '허걱', '바와같이', '해도좋다', '해도된다', '게다가', '더구나', '하물며', '와르르', '팍', '퍽', '펄렁', '동안', '이래', '하고있었다', '이었다', '에서', '로부터', '까지', '예하면', '했어요', '해요', '함께', '같이', '더불어', '마저', '마저도', '양자', '모두', '습니다', '가까스로', '하려고하다', '즈음하여', '다른', '다른 방면으로', '해봐요', '습니까', '했어요', '말할것도 없고', '무릎쓰고', '개의치않고', '하는것만 못하다', '하는것이 낫다', '매', '매번', '들', '모', '어느것', '어느', '로써', '갖고말하자면', '어디', '어느쪽', '어느것', '어느해', '어느 년도', '라 해도', '언젠가', '어떤것', '어느것', '저기', '저쪽', '저것', '그때', '그럼', '그러면', '요만한걸', '그래', '그때', '저것만큼', '그저', '이르기까지', '할 줄 안다', '할 힘이 있다', '너', '너희', '당신', '어찌', '설마', '차라리', '할지언정', '할지라도', '할망정', '할지언정', '구토하다', '게우다', '토하다', '메쓰겁다', '옆사람', '퉤', '쳇', '의거하여', '근거하여', '의해', '따라', '힘입어', '그', '다음', '버금', '두번째로', '기타', '첫번째로', '나머지는', '그중에서', '견지에서', '형식으로 쓰여', '입장에서', '위해서', '단지', '의해되다', '하도록시키다', '뿐만아니라', '반대로', '전후', '전자', '앞의것', '잠시', '잠깐', '하면서', '그렇지만', '다음에', '그러한즉', '그런즉', '남들', '아무거나', '어찌하든지', '같다', '비슷하다', '예컨대', '이럴정도로', '어떻게', '만약', '만일', '위에서 서술한바와같이', '인 듯하다', '하지 않는다면', '만약에', '무엇', '무슨', '어느', '어떤', '아래윗', '조차', '한데', '그럼에도 불구하고', '여전히', '심지어', '까지도', '조차도', '하지 않도록', '않기 위하여', '때', '시각', '무렵', '시간', '동안', '어때', '어떠한', '하여금', '네', '예', '우선', '누구', '누가 알겠는가', '아무도', '줄은모른다', '줄은 몰랏다', '하는 김에', '겸사겸사', '하는바', '그런 까닭에', '한 이유는', '그러니', '그러니까', '때문에', '그', '너희', '그들', '너희들', '타인', '것', '것들', '너', '위하여', '공동으로', '동시에', '하기 위하여', '어찌하여', '무엇때문에', '붕붕', '윙윙', '나', '우리', '엉엉', '휘익', '윙윙', '오호', '아하', '어쨋든', '만 못하다	하기보다는', '차라리', '하는 편이 낫다', '흐흐', '놀라다', '상대적으로 말하자면', '마치', '아니라면', '쉿', '그렇지 않으면', '그렇지 않다면', '안 그러면', '아니었다면', '하든지', '아니면', '이라면', '좋아', '알았어', '하는것도', '그만이다', '어쩔수 없다', '하나', '일', '일반적으로', '일단', '한켠으로는', '오자마자', '이렇게되면', '이와같다면', '전부', '한마디', '한항목', '근거로', '하기에', '아울러', '하지 않도록', '않기 위해서', '이르기까지', '이 되다', '로 인하여', '까닭으로', '이유만으로', '이로 인하여', '그래서', '이 때문에', '그러므로', '그런 까닭에', '알 수 있다', '결론을 낼 수 있다', '으로 인하여', '있다', '어떤것', '관계가 있다', '관련이 있다', '연관되다', '어떤것들', '에 대해', '이리하여', '그리하여', '여부', '하기보다는', '하느니', '하면 할수록', '운운', '이러이러하다', '하구나', '하도다', '다시말하면', '다음으로', '에 있다', '에 달려 있다', '우리', '우리들', '오히려', '하기는한데', '어떻게', '어떻해', '어찌됏어', '어때', '어째서', '본대로', '자', '이', '이쪽', '여기', '이것', '이번', '이렇게말하자면', '이런', '이러한', '이와 같은', '요만큼', '요만한 것', '얼마 안 되는 것', '이만큼', '이 정도의', '이렇게 많은 것', '이와 같다', '이때', '이렇구나', '것과 같이', '끼익', '삐걱', '따위', '와 같은 사람들', '부류의 사람들', '왜냐하면', '중의하나', '오직', '오로지', '에 한하다', '하기만 하면', '도착하다', '까지 미치다', '도달하다', '정도에 이르다', '할 지경이다', '결과에 이르다', '관해서는', '여러분', '하고 있다', '한 후', '혼자', '자기', '자기집', '자신', '우에 종합한것과같이', '총적으로 보면', '총적으로 말하면', '총적으로', '대로 하다', '으로서', '참', '그만이다', '할 따름이다', '쿵', '탕탕', '쾅쾅', '둥둥', '봐', '봐라', '아이야', '아니', '와아', '응', '아이', '참나', '년', '월', '일', '령', '영', '일', '이', '삼', '사', '오', '육', '륙', '칠', '팔', '구', '이천육', '이천칠', '이천팔', '이천구', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉', '령', '영'],

            // Match individual characters so we can provide a 'forward' tokenization
            tokenize: text => text.match(/[^\s]/g),
        });
    }
    private static optionsPortuguese(options: CreateOptions): CreateOptions {
        return Object.assign(options, {
            // https://github.com/nextapps-de/flexsearch#encoders
            encode: 'icase',

            // http://www.ranks.nl/stopwords/portuguese
            filter: ['último', 'é', 'acerca', 'agora', 'algumas', 'alguns', 'ali', 'ambos', 'antes', 'apontar', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aqui', 'atrás', 'bem', 'bom', 'cada', 'caminho', 'cima', 'com', 'como', 'comprido', 'conhecido', 'corrente', 'das', 'debaixo', 'dentro', 'desde', 'desligado', 'deve', 'devem', 'deverá', 'direita', 'diz', 'dizer', 'dois', 'dos', 'e', 'ela', 'ele', 'eles', 'em', 'enquanto', 'então', 'está', 'estão', 'estado', 'estar', 'estará', 'este', 'estes', 'esteve', 'estive', 'estivemos', 'estiveram', 'eu', 'fará', 'faz', 'fazer', 'fazia', 'fez', 'fim', 'foi', 'fora', 'horas', 'iniciar', 'inicio', 'ir', 'irá', 'ista', 'iste', 'isto', 'ligado', 'maioria', 'maiorias', 'mais', 'mas', 'mesmo', 'meu', 'muito', 'muitos', 'nós', 'não', 'nome', 'nosso', 'novo', 'o', 'onde', 'os', 'ou', 'outro', 'para', 'parte', 'pegar', 'pelo', 'pessoas', 'pode', 'poderá', 'podia', 'por', 'porque', 'povo', 'promeiro', 'quê', 'qual', 'qualquer', 'quando', 'quem', 'quieto', 'são', 'saber', 'sem', 'ser', 'seu', 'somente', 'têm', 'tal', 'também', 'tem', 'tempo', 'tenho', 'tentar', 'tentaram', 'tente', 'tentei', 'teu', 'teve', 'tipo', 'tive', 'todos', 'trabalhar', 'trabalho', 'tu', 'um', 'uma', 'umas', 'uns', 'usa', 'usar', 'valor', 'veja', 'ver', 'verdade', 'verdadeiro', 'você'],

            // https://github.com/nextapps-de/flexsearch#tokenizer
            tokenize: 'forward'
        });
    }
    private static optionsRussian(options: CreateOptions): CreateOptions {
        return Object.assign(options, {
            // https://github.com/nextapps-de/flexsearch#encoders
            encode: 'icase',

            // http://www.ranks.nl/stopwords/russian
            filter: ['а', 'е', 'и', 'ж', 'м', 'о', 'на', 'не', 'ни', 'об', 'но', 'он', 'мне', 'мои', 'мож', 'она', 'они', 'оно', 'мной', 'много', 'многочисленное', 'многочисленная', 'многочисленные', 'многочисленный', 'мною', 'мой', 'мог', 'могут', 'можно', 'может', 'можхо', 'мор', 'моя', 'моё', 'мочь', 'над', 'нее', 'оба', 'нам', 'нем', 'нами', 'ними', 'мимо', 'немного', 'одной', 'одного', 'менее', 'однажды', 'однако', 'меня', 'нему', 'меньше', 'ней', 'наверху', 'него', 'ниже', 'мало', 'надо', 'один', 'одиннадцать', 'одиннадцатый', 'назад', 'наиболее', 'недавно', 'миллионов', 'недалеко', 'между', 'низко', 'меля', 'нельзя', 'нибудь', 'непрерывно', 'наконец', 'никогда', 'никуда', 'нас', 'наш', 'нет', 'нею', 'неё', 'них', 'мира', 'наша', 'наше', 'наши', 'ничего', 'начала', 'нередко', 'несколько', 'обычно', 'опять', 'около', 'мы', 'ну', 'нх', 'от', 'отовсюду', 'особенно', 'нужно', 'очень', 'отсюда', 'в', 'во', 'вон', 'вниз', 'внизу', 'вокруг', 'вот', 'восемнадцать', 'восемнадцатый', 'восемь', 'восьмой', 'вверх', 'вам', 'вами', 'важное', 'важная', 'важные', 'важный', 'вдали', 'везде', 'ведь', 'вас', 'ваш', 'ваша', 'ваше', 'ваши', 'впрочем', 'весь', 'вдруг', 'вы', 'все', 'второй', 'всем', 'всеми', 'времени', 'время', 'всему', 'всего', 'всегда', 'всех', 'всею', 'всю', 'вся', 'всё', 'всюду', 'г', 'год', 'говорил', 'говорит', 'года', 'году', 'где', 'да', 'ее', 'за', 'из', 'ли', 'же', 'им', 'до', 'по', 'ими', 'под', 'иногда', 'довольно', 'именно', 'долго', 'позже', 'более', 'должно', 'пожалуйста', 'значит', 'иметь', 'больше', 'пока', 'ему', 'имя', 'пор', 'пора', 'потом', 'потому', 'после', 'почему', 'почти', 'посреди', 'ей', 'два', 'две', 'двенадцать', 'двенадцатый', 'двадцать', 'двадцатый', 'двух', 'его', 'дел', 'или', 'без', 'день', 'занят', 'занята', 'занято', 'заняты', 'действительно', 'давно', 'девятнадцать', 'девятнадцатый', 'девять', 'девятый', 'даже', 'алло', 'жизнь', 'далеко', 'близко', 'здесь', 'дальше', 'для', 'лет', 'зато', 'даром', 'первый', 'перед', 'затем', 'зачем', 'лишь', 'десять', 'десятый', 'ею', 'её', 'их', 'бы', 'еще', 'при', 'был', 'про', 'процентов', 'против', 'просто', 'бывает', 'бывь', 'если', 'люди', 'была', 'были', 'было', 'будем', 'будет', 'будете', 'будешь', 'прекрасно', 'буду', 'будь', 'будто', 'будут', 'ещё', 'пятнадцать', 'пятнадцатый', 'друго', 'другое', 'другой', 'другие', 'другая', 'других', 'есть', 'пять', 'быть', 'лучше', 'пятый', 'к', 'ком', 'конечно', 'кому', 'кого', 'когда', 'которой', 'которого', 'которая', 'которые', 'который', 'которых', 'кем', 'каждое', 'каждая', 'каждые', 'каждый', 'кажется', 'как', 'какой', 'какая', 'кто', 'кроме', 'куда', 'кругом', 'с', 'т', 'у', 'я', 'та', 'те', 'уж', 'со', 'то', 'том', 'снова', 'тому', 'совсем', 'того', 'тогда', 'тоже', 'собой', 'тобой', 'собою', 'тобою', 'сначала', 'только', 'уметь', 'тот', 'тою', 'хорошо', 'хотеть', 'хочешь', 'хоть', 'хотя', 'свое', 'свои', 'твой', 'своей', 'своего', 'своих', 'свою', 'твоя', 'твоё', 'раз', 'уже', 'сам', 'там', 'тем', 'чем', 'сама', 'сами', 'теми', 'само', 'рано', 'самом', 'самому', 'самой', 'самого', 'семнадцать', 'семнадцатый', 'самим', 'самими', 'самих', 'саму', 'семь', 'чему', 'раньше', 'сейчас', 'чего', 'сегодня', 'себе', 'тебе', 'сеаой', 'человек', 'разве', 'теперь', 'себя', 'тебя', 'седьмой', 'спасибо', 'слишком', 'так', 'такое', 'такой', 'такие', 'также', 'такая', 'сих', 'тех', 'чаще', 'четвертый', 'через', 'часто', 'шестой', 'шестнадцать', 'шестнадцатый', 'шесть', 'четыре', 'четырнадцать', 'четырнадцатый', 'сколько', 'сказал', 'сказала', 'сказать', 'ту', 'ты', 'три', 'эта', 'эти', 'что', 'это', 'чтоб', 'этом', 'этому', 'этой', 'этого', 'чтобы', 'этот', 'стал', 'туда', 'этим', 'этими', 'рядом', 'тринадцать', 'тринадцатый', 'этих', 'третий', 'тут', 'эту', 'суть', 'чуть', 'тысяч'],

            // https://github.com/nextapps-de/flexsearch#tokenizer
            tokenize: 'forward'
        });
    }
    private static optionsTaiwanese(options: CreateOptions): CreateOptions {
        return Object.assign(options, {
            // https://github.com/nextapps-de/flexsearch#encoders
            encode: 'icase',

            // http://www.ranks.nl/stopwords/chinese
            filter: [' ', '的', '一', '不', '在', '人', '有', '是', '为', '以', '于', '上', '他', '而', '后', '之', '来', '及', '了', '因', '下', '可', '到', '由', '这', '与', '也', '此', '但', '并', '个', '其', '已', '无', '小', '我', '们', '起', '最', '再', '今', '去', '好', '只', '又', '或', '很', '亦', '某', '把', '那', '你', '乃', '它', '吧', '被', '比', '别', '趁', '当', '从', '到', '得', '打', '凡', '儿', '尔', '该', '各', '给', '跟', '和', '何', '还', '即', '几', '既', '看', '据', '距', '靠', '啦', '了', '另', '么', '每', '们', '嘛', '拿', '哪', '那', '您', '凭', '且', '却', '让', '仍', '啥', '如', '若', '使', '谁', '虽', '随', '同', '所', '她', '哇', '嗡', '往', '哪', '些', '向', '沿', '哟', '用', '于', '咱', '则', '怎', '曾', '至', '致', '着', '诸', '自'],

            // Match individual characters so we can provide a 'forward' tokenization
            tokenize: text => text.match(/[^\s]/g),
        });
    }

}

export type FlexSearchEntry = { [key: string]: string } & {
    $dataset: V2TOSDataSet;
    $table: string;
    ClassID: number;
    Name: string;
}

export interface FlexSearchPageable<T> {
    content?: T[];
    filter?: (value: T) => boolean;
    page?: number;
    pageSize?: number;
    pageTotal?: number;
    search?: string;
    sort?: FlexSearchPageable$Sort;
}
export interface FlexSearchPageable$Sort {
    column: string;
    order: FlexSearchPageable$SortOrder;
}
export enum FlexSearchPageable$SortOrder {
    ASC = 1,
    DESC = -1,
}