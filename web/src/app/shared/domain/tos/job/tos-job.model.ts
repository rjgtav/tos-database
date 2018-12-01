import {TOSEntity} from "../tos-entity.model";
import {
  ITOSAttribute,
  ITOSJob,
  ITOSSkill,
  TOSDataSet,
  TOSJobDifficulty,
  TOSJobTree,
  TOSJobType
} from "../tos-domain";
import {TOSDomainService} from "../tos-domain.service";
import {RANK_LIMIT} from "../tos-build";

export class TOSJob extends TOSEntity implements ITOSJob {

  constructor(private json: TOSJob) {
    super(TOSDataSet.JOBS, json);
  }

  get CircleAvailable(): number[] { return Array.from(Array(this.CircleMax).keys(), n => n + 1) }
  get CircleMax() { return this.$lazyPropertyNumber('CircleMax') }
  get IconAnimations(): string[] {
    return this.Rank > RANK_LIMIT
      ? null
      : [
        'assets/images/classes/' + this.$ID_NAME + '_f.gif',
        'assets/images/classes/' + this.$ID_NAME + '_m.gif',
      ];
  }
  get IsHidden() { return this.$lazyPropertyBoolean('IsHidden') }
  get IsSecret() { return this.$lazyPropertyBoolean('IsSecret') }
  get JobDifficulty() { return this.$lazyPropertyEnum('JobDifficulty', TOSJobDifficulty) }
  get JobTree() { return this.$lazyPropertyEnum('JobTree', TOSJobTree) }
  get JobType() { return this.$lazyPropertyJSONArray('JobType', (value) => Object.values(TOSJobType)[value]) }
  get Rank() { return this.$lazyPropertyNumber('Rank') }
  get Stat_CON() { return this.$lazyPropertyNumber('Stat_CON') }
  get Stat_DEX() { return this.$lazyPropertyNumber('Stat_DEX') }
  get Stat_INT() { return this.$lazyPropertyNumber('Stat_INT') }
  get Stat_SPR() { return this.$lazyPropertyNumber('Stat_SPR') }
  get Stat_STR() { return this.$lazyPropertyNumber('Stat_STR') }
  get StatBase_CON() { return this.$lazyPropertyNumber('StatBase_CON') }
  get StatBase_DEX() { return this.$lazyPropertyNumber('StatBase_DEX') }
  get StatBase_INT() { return this.$lazyPropertyNumber('StatBase_INT') }
  get StatBase_SPR() { return this.$lazyPropertyNumber('StatBase_SPR') }
  get StatBase_STR() { return this.$lazyPropertyNumber('StatBase_STR') }

  get Link_Attributes(): ITOSAttribute[] {
    return this.$lazyPropertyJSONArray('Link_Attributes', (value) => TOSDomainService.attributesById[value]);
  }
  get Link_Skills(): ITOSSkill[] {
    return this.$lazyPropertyJSONArray('Link_Skills', (value) => TOSDomainService.skillsById[value]);
  }

}
