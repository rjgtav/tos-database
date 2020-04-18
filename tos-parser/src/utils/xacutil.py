import logging
import struct

# Format definition can be found at /docs/xac

# Problematic .xac files
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'housing', 'h_barrack_puddle', 'h_barrack_puddle.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'housing', 'h_statue_02', 'h_statue_02.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'anvil', 'anvil_gold.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'monster', 'boss_ferretmarauder_set.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'monster', 'boss_blackgargoyle_set.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'monster', 'boss_prisoncutter_set.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'monster', 'boss_tantaliser_set.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'misc', 'abcd.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'monster', 'subzeroshield_set.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'npc_hiddennpc_darktheurge_set.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'npc_hiddennpc_set.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'npc_anabellswyn', 'anabellswyn_f_head_std.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'npc_dievdirbys_m', 'npc_dievdirbys_m_head_std.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'npc_exorcist_master', 'exorcist_head_std.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'npc_henryswyn', 'henryswyn_m_head_std.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'npc_pidepiper_master', 'npc_pidepiper_head_std.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'npc', 'npc_Teliavelis', 'teliavelis_head_std.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'archer_f', 'archer_f_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'archer_m', 'archer_m_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'Cleric_f', 'cleric_f_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'Cleric_m', 'cleric_m_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'faces', 'archer_f', 'jullahair', 'jullahair_head_skl_quickfire.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'faces', 'archer_f', 'waveponytail', 'wavetwinhair_head_skl_crouchingstrike.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'faces', 'archer_f', 'waveponytail', 'wavetwinhair_head_skl_roar.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'faces', 'archer_m', 'Plaguedoctor', 'plaguedoctor_head_skl_fireandforget.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'faces', 'archer_m', 'Plaguedoctor', 'plaguedoctor_head_skl_quickfire.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'faces', 'warrior_m', 'kastytis_m_head_std.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'mage_f', 'mage_f_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'mage_m', 'mage_m_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'Scout_f', 'scout_f_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'Scout_m', 'scout_m_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'warrior_f', 'warrior_f_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'char_hi.ipf', 'pc', 'warrior_m', 'warrior_m_bodybase.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'item_hi.ipf', 'pc_item', 'weapon', 'cleric_f_mace_velcofer.xac'))
# xacutil.xac2obj(os.path.join(constants.PATH_INPUT_DATA, 'item_hi.ipf', 'pc_item', 'weapon', 'omamori_kami_set.xac'))


def xac2obj(path):
    def coalesce (x, i):
        return 0 if x is None else x[i]

    path_xac = path
    path_obj = path.replace('.xac', '.obj')

    logging.debug('xacutil.xac2obj(%s)' % path)
    with open(path_xac, 'rb') as input:
        with open(path_obj, 'wb') as output:
            list_materials, list_models = xac_parser(path_xac, InputStream(input.read()))

            if len([model for model in list_models if len(model.meshes) > 0]) == 0:
                logging.warn('xacutil.xac2obj(%s) -- Skipping empty xac' % path)

            for material in list_materials:
                output.write('# material %s\n' % material.texture)

            for model in list_models:
                for mesh in model.meshes:
                    output.write('# mesh %s %s\n' % (mesh.id, mesh.material.id))
                    output.write('o %d\n' % mesh.id)
                    for geometry in mesh.geometry:
                        output.write('v %.6f %.6f %.6f\n' % (coalesce(geometry, 0), coalesce(geometry, 1), coalesce(geometry, 2)))
                    for normal in mesh.normals:
                        output.write('vn %.6f %.6f %.6f\n' % (coalesce(normal, 0), coalesce(normal, 1), coalesce(normal, 2)))
                    for uv in mesh.uv:
                        output.write('vt %.6f %.6f\n' % (coalesce(uv, 0), coalesce(uv, 1)))
                    for face in [face for face in mesh.faces if face is not None]:
                        output.write('f %d/%d/%d %d/%d/%d %d/%d/%d\n' % (
                            face[0] + 1, face[0] + 1, face[0] + 1,
                            face[1] + 1, face[1] + 1, face[1] + 1,
                            face[2] + 1, face[2] + 1, face[2] + 1,
                        ))


# Thanks herbert3000
# http://forum.xentax.com/viewtopic.php?f=18&t=12512
def xac_parser(path, stream):

    if stream.read_string(4) != 'XAC ':
        raise Exception('Invalid XAC file')

    stream.skip(4)

    list_materials = []
    list_models = []
    offset_geometry = 0

    while not stream.eof():
        # Read chunk header
        chunk_id = stream.read_int()
        chunk_length = stream.read_int()
        chunk_version = stream.read_int()

        #logging.debug('chunk_id: %d, chunk_length: %d, chunk_version: %d' % (chunk_id, chunk_length, chunk_version))

        if chunk_id == 1:
            # Model chunk
            model = Model()
            model_id = stream.read_int()
            model_skin_count = stream.read_int()
            list_models.append(model)

            num_vertices = stream.read_int()
            num_faces = stream.read_int()
            num_meshes = stream.read_int()
            num_blocks = stream.read_int()
            stream.skip(4)

            geometry = [None] * num_vertices
            normals = [None] * num_vertices
            uv = [None] * num_vertices
            #faces = [None] * num_faces

            for i in range(num_blocks):
                block_id = stream.read_int()
                stream.skip(4)
                stream.skip(4)

                if block_id == 0:  # Vertex positions
                    for j in range(num_vertices):
                        x = stream.read_float()
                        y = stream.read_float()
                        z = stream.read_float()

                        geometry[j] = [x, y, z] if geometry[j] is None else geometry[j]

                elif block_id == 1:  # Vertex normals
                    for j in range(num_vertices):
                        x = stream.read_float()
                        y = stream.read_float()
                        z = stream.read_float()

                        normals[j] = [x, y, z] if normals[j] is None else normals[j]

                elif block_id == 2:  # ??
                    for j in range(num_vertices):
                        stream.read_float()
                        stream.read_float()
                        stream.read_float()
                        stream.read_float()

                elif block_id == 3:  # UV coordinates
                    for j in range(num_vertices):
                        u = stream.read_float()
                        v = stream.read_float()

                        uv[j] = [u, v] if uv[j] is None else uv[j]

                elif block_id == 5:  # Skins
                    for j in range(num_vertices):
                        stream.read_int()

                elif block_id == 6:  # ??
                    for j in range(num_vertices):
                        stream.read_int()
                        stream.read_int()
                        stream.read_int()
                        stream.read_int()

                else:
                    raise Exception('unknown block_id: %d' % block_id)

            offset_j = 0

            for i in range(num_meshes):
                num_faces_mesh = stream.read_int()
                num_vertices_mesh = stream.read_int()
                material_id = stream.read_int()
                num_bones_mesh = stream.read_int()

                mesh = Mesh(num_faces_mesh / 3, num_vertices_mesh)
                mesh.material = list_materials[material_id]

                for j in range(num_faces_mesh / 3):
                    mesh.faces[j] = [stream.read_int() + offset_geometry, stream.read_int() + offset_geometry, stream.read_int() + offset_geometry]
                for j in range(num_vertices_mesh):
                    mesh.geometry[j] = geometry[offset_j + j]
                    mesh.normals[j] = normals[offset_j + j]
                    mesh.uv[j] = uv[offset_j + j]

                # Skip bones
                for j in range(num_bones_mesh):
                    stream.read_int()

                # Skip incomplete meshes, as they're usually just auxiliary
                if mesh.geometry[0] is not None and mesh.normals[0] is not None and mesh.uv[0] is not None and mesh.material is not None:
                    mesh.id = len(model.meshes)
                    offset_geometry += num_vertices_mesh

                    model.meshes.append(mesh)

                offset_j += num_vertices_mesh

        elif chunk_id == 3:
            # Materials chunk
            stream.skip(21 * 4)

            material = Material(list_materials)
            material_name_length = stream.read_int()
            material_name = stream.read_string(material_name_length)

            while not stream.eof():
                material_chunk_id = stream.read_int()
                material_chunk_length = stream.read_int()
                material_chunk_version = stream.read_int()

                material_offset = stream.offset

                # HotFix: some models have 28 bytes + a string out of nowhere in here, between this and the next chunk
                if material_chunk_id == 1065353216:

                    stream.skip(4 * 4)

                    bone_name_length = stream.read_int()
                    bone_name = stream.read_string(bone_name_length)

                elif material_chunk_id == 5:

                    stream.skip(6 * 4)

                    bone_name_length = stream.read_int()
                    bone_name = stream.read_string(bone_name_length)

                    fx_name_length = stream.read_int()
                    fx_name = stream.read_string(fx_name_length)

                    material = Material(list_materials)

                    while not stream.eof():
                        property_name, property_value = xac_parser_material_property(stream)

                        if property_name == 'DiffuseTex':
                            material.texture = property_value.lower().replace('.dds', '.png')
                        if property_value is None:
                            break

                    # Seek to the end of chunk 5
                    stream.offset = material_offset + material_chunk_length

                else:
                    # Unread the last 3 ints
                    stream.offset -= 3 * 4
                    break

        else:
            # Unknown chunk, just skip it
            # 0 - ??
            # 2 - Something skin related
            # 4 - ??
            # 7 - ??
            # 8 - ??
            # 11 - Bone structure
            # 13 - ??
            stream.skip(chunk_length)

    return list_materials, list_models


# Thanks Szkaradek123
# https://forum.xentax.com/viewtopic.php?f=16&t=12516#p103066
def xac_parser_material_property(stream):
    property_name_length = stream.read_int()
    property_name = stream.read_string(property_name_length)

    if property_name == 'CharacterShadingTq_NoOutline':
        return property_name, stream.read_int()
    if property_name == 'DiffuseEnvOpaTq':
        return property_name, stream.read_int()
    if property_name == 'DiffuseTex':
        return property_name, stream.read_string(stream.read_int())
    if property_name == 'DiffuseTexmapChannel':
        return property_name, stream.read_int()
    if property_name == 'envValue':
        return property_name, stream.read_float()
    if property_name == 'farBrightness':
        return property_name, stream.read_float()
    if property_name == 'farContrast':
        return property_name, stream.read_float()
    if property_name == 'farHue':
        return property_name, stream.read_float()
    if property_name == 'farSaturation':
        return property_name, stream.read_float()
    if property_name == 'gamma':
        return property_name, stream.read_bool()
    if property_name == 'g_depthDistanceValue':
        return property_name, stream.read_float()
    if property_name == 'g_isEnvOn':
        return property_name, stream.read_bool()
    if property_name == 'g_isAlphaBlendOn':
        return property_name, stream.read_bool()
    if property_name == 'g_isAlphaTestOn':
        return property_name, stream.read_bool()
    if property_name == 'g_isFogOff':
        return property_name, 0
    if property_name == 'g_isLightOff':
        return property_name, stream.read_bool()
    if property_name == 'g_isZwriteOff':
        return property_name, stream.read_bool()
    if property_name == 'g_isSortByViewOn':
        return property_name, stream.read_bool()
    if property_name == 'g_isTwoSideOn':
        return property_name, stream.read_bool()
    if property_name == 'g_isUseShadowAlpha':
        return property_name, stream.read_bool()
    if property_name == 'g_alphaTestValue':
        return property_name, stream.read_int()
    if property_name == 'g_dstAlphaValue':
        return property_name, stream.read_int()
    if property_name == 'g_srcAlphaValue':
        return property_name, stream.read_int()
    if property_name == 'g_MidPosX':
        return property_name, stream.read_float()
    if property_name == 'g_MidPosY':
        return property_name, stream.read_float()
    if property_name == 'g_MidPosZ':
        return property_name, stream.read_float()
    if property_name == 'nearBrightness':
        return property_name, stream.read_float()
    if property_name == 'nearContrast':
        return property_name, stream.read_float()
    if property_name == 'nearHue':
        return property_name, stream.read_float()
    if property_name == 'nearSaturation':
        return property_name, stream.read_float()
    if property_name == 'nearTopBrightness':
        return property_name, stream.read_float()
    if property_name == 'nearTopContrast':
        return property_name, stream.read_float()
    if property_name == 'nearTopHue':
        return property_name, stream.read_float()
    if property_name == 'nearTopSaturation':
        return property_name, stream.read_float()
    if property_name == 'nearBottomBrightness':
        return property_name, stream.read_float()
    if property_name == 'nearBottomContrast':
        return property_name, stream.read_float()
    if property_name == 'nearBottomHue':
        return property_name, stream.read_float()
    if property_name == 'nearBottomSaturation':
        return property_name, stream.read_float()
    if property_name == 'outlineBrightness':
        return property_name, stream.read_float()
    if property_name == 'outlineContrast':
        return property_name, stream.read_float()
    if property_name == 'outlineHue':
        return property_name, stream.read_float()
    if property_name == 'outlineSaturation':
        return property_name, stream.read_float()
    if property_name == 'TextureAnimationPlayTime':
        return property_name, stream.read_bool()
    if property_name == 'TextureVOffSet':
        return property_name, stream.read_int()
    if property_name == 'TextureUOffSet':
        return property_name, stream.read_int()
    if property_name == 'UVAnimationType':
        return property_name, stream.read_int()
    if property_name == 'ShadowTexmapChannel':
        return property_name, stream.read_int()

    return property_name, None


class InputStream:

    def __init__(self, buffer):
        self.buffer = buffer
        self.offset = 0

    def eof(self):
        return self.offset >= len(self.buffer)

    def read_bool(self):
        self.offset += 1
        return struct.unpack_from("<?", self.buffer, self.offset - 1)[0]

    def read_float(self):
        self.offset += 4
        return struct.unpack_from("<f", self.buffer, self.offset - 4)[0]

    def read_int(self):
        self.offset += 4
        return struct.unpack_from("<i", self.buffer, self.offset - 4)[0]

    def read_short(self):
        self.offset += 2
        return struct.unpack_from("<h", self.buffer, self.offset - 2)[0]

    def read_string(self, length):
        if length == 0:
            return None

        self.offset += length
        return struct.unpack_from("<" + str(length) + "s", self.buffer, self.offset - length)[0]

    def skip(self, length):
        self.offset += length


class Material:

    def __init__(self, list_materials):
        self.id = len(list_materials)
        self.texture = None

        list_materials.append(self)


class Mesh:

    def __init__(self, num_faces, num_vertices):
        self.faces = [None] * num_faces
        self.geometry = [None] * num_vertices
        self.normals = [None] * num_vertices
        self.uv = [None] * num_vertices

        self.id = None
        self.material = None


class Model:
    def __init__(self):
        self.meshes = []
