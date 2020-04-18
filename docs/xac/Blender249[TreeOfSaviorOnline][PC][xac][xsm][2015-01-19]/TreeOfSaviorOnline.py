import newGameLib
reload(newGameLib)
import Blender


class Model:
	def __init__(self):
		self.meshList=[]

def matItem(item,g):
	value=None
	if item=='CharacterShadingTq_NoOutline':value=g.i(1)[0]	
	elif item=='g_isTwoSideOn':value=g.B(1)[0]
	elif item=='g_isUseShadowAlpha':value=g.B(1)[0]
	elif item=='g_isSortByViewOn':value=g.B(1)[0]	
	elif item=='TextureAnimationPlayTime':value=g.B(1)[0]
	elif item=='TextureVOffSet':value=g.i(1)[0]
	elif item=='TextureUOffSet':value=g.i(1)[0]	
	elif item=='UVAnimationType':value=g.i(1)[0]
	elif item=='ShadowTexmapChannel':value=g.i(1)[0]
	elif item=='DiffuseTexmapChannel':value=g.i(1)[0]
	elif item=='DiffuseEnvOpaTq':value=g.i(1)[0]
	elif item=='DiffuseTexmapChannel':value=g.i(1)[0]
	elif item=='g_srcAlphaValue':value=g.i(1)[0]
	elif item=='g_dstAlphaValue':value=g.i(1)[0]
	elif item=='g_alphaTestValue':value=g.i(1)[0]
	elif item=='g_MidPosX':value=g.i(1)[0]
	elif item=='g_MidPosY':value=g.f(1)[0]
	elif item=='g_MidPosZ':value=g.f(1)[0]
	elif item=='envValue':value=g.f(1)[0]
	elif item=='g_depthDistanceValue':value=g.f(1)[0]
	elif item=='farBrightness':value=g.f(1)[0]
	elif item=='farContrast':value=g.f(1)[0]
	elif item=='farHue':value=g.f(1)[0]
	elif item=='farSaturation':value=g.f(1)[0]
	elif item=='nearBrightness':value=g.f(1)[0]
	elif item=='nearContrast':value=g.f(1)[0]
	elif item=='nearHue':value=g.f(1)[0]
	elif item=='nearSaturation':value=g.f(1)[0]
	elif item=='nearTopBrightness':value=g.f(1)[0]
	elif item=='nearTopContrast':value=g.f(1)[0]
	elif item=='nearTopHue':value=g.f(1)[0]
	elif item=='nearTopSaturation':value=g.f(1)[0]
	elif item=='nearBottomBrightness':value=g.f(1)[0]
	elif item=='nearBottomContrast':value=g.f(1)[0]
	elif item=='nearBottomHue':value=g.f(1)[0]
	elif item=='nearBottomSaturation':value=g.f(1)[0]
	elif item=='outlineBrightness':value=g.f(1)[0]
	elif item=='outlineContrast':value=g.f(1)[0]
	elif item=='outlineHue':value=g.f(1)[0]
	elif item=='outlineSaturation':value=g.f(1)[0]
	elif item=='gamma':value=g.B(1)[0]
	elif item=='g_isEnvOn':value=g.B(1)[0]
	elif item=='g_isAlphaBlendOn':value=g.B(1)[0]
	elif item=='g_isAlphaTestOn':value=g.B(1)[0]
	elif item=='g_isLightOff':value=g.B(1)[0]
	elif item=='g_isZwriteOff':value=g.B(1)[0]
	elif item=='g_isFogOff':value=0
	elif item=='DiffuseTex':value=g.word(g.i(1)[0])
	return value
	
def xacParser(filename,g,modelName):
	skeleton=Skeleton()
	skeleton.BONESPACE=True
	skeleton.NICE=True
	skeleton.name=modelName+'skeleton'
	g.word(4) 
	g.B(4) 
	modelList=[]
	matList=[]
	while(True):
			data = g.i(3)
			back = g.tell()
			if data[0]==8:
				g.seek(16,1)
				break
			elif data[0]==7:
				g.i(2);g.B(4);g.i(1)[0]
				g.word(g.i(1)[0])
				model=g.word(g.i(1)[0])
				g.word(g.i(1)[0])
				g.i(1)[0]
			elif data[0]==11:
				boneCount=g.i(1)[0]
				g.i(1)
				for m in range(boneCount):
					bone=Bone()
					t=g.tell()
					bone.rotMatrix=QuatMatrix(g.f(4)).resize4x4()
					g.seek(16,1)
					bone.posMatrix=VectorMatrix(g.f(4))
					g.seek(t+68)
					w=g.i(4)
					bone.parentID=w[2]
					g.seek(t+156)
					bone.name=g.word(g.i(1)[0])[-25:]
					skeleton.boneList.append(bone)
			elif data[0]==0:
				w = g.f(16)
				v = g.i(4)
				name = g.word(g.i(1)[0])[-25:]
			elif data[0]==3:
				t=g.tell()
				g.f(21)
				g.word(g.i(1)[0])
				while(True):
					A=g.i(3)
					if A[0]==5:
						mat=Mat()
						matOff=g.tell()
						B=g.i(6)
						mat.boneParent=g.word(g.i(1)[0])
						g.word(g.i(1)[0])
						while(True):	
							pos=g.tell()
							item=g.word(g.i(1)[0])
							itemValue=matItem(item,g)
							if item=='DiffuseTex':	
								mat.diffuse=g.dirname+os.sep+itemValue.replace(' ','_')
							if itemValue==None:
								g.seek(pos)
								break
						g.seek(matOff+A[1])	
						matList.append(mat)	
					else:
						break
				g.seek(t+data[1]) 
			elif data[0]==4:
				g.f(7)
				g.word(g.i(1)[0])
			elif data[0]==1:
				model=Model()
				meshList=[]
				skinList=[]				
				vertPosList=[]
				vertUVList=[]
				skinIDList=[]
				model.skinIndiceList=[]
				model.skinWeightList=[]	
				w = g.i(7) 				
				model.ID=w[0]
				model.skinVertCount=w[1]				
				vertexCount = w[2]
				faceCount = w[3] 
				meshCount = w[4]
				for m1 in range(w[5]):
					v = g.i(3)	
					if v[0]==0:#position 
						for m in range(vertexCount):vertPosList.append(g.f(3))
					elif v[0]==1:#normals 
						for m in range(vertexCount):g.f(3) 
					elif v[0]==3:#uv
						for m in range(vertexCount):vertUVList.append(g.f(2))
					elif v[0]==2:
						for m in range(vertexCount):g.f(4)
					elif v[0]==5:
						for m in range(vertexCount):skinIDList.append(g.i(1)[0])		
					else:print 'unknow',v	
				vertIDStart=0		
				for i in range(meshCount):
					mesh=Mesh()
					w = g.i(4)	
					mesh.indiceList=g.i(w[0])
					mesh.vertPosList=vertPosList[vertIDStart:vertIDStart+w[1]]
					mesh.vertUVList=vertUVList[vertIDStart:vertIDStart+w[1]]
					mesh.skinVertIDList=skinIDList[vertIDStart:vertIDStart+w[1]]
					mesh.vertIDStart=vertIDStart
					mesh.ID=w[0]
					boneMap=g.i(w[3]) 
					mat=Mat()
					mat.ID=w[2]-1
					#mat=matList[w[2]]
					mat.TRIANGLE=True
					mat.ZTRANS=True
					mesh.matList.append(mat)
					vertIDStart+=w[1]
					model.meshList.append(mesh)
				modelList.append(model)	
					
			elif data[0]==2:
				w = g.i(4)	
				t=g.tell()
				g.seek(w[2]*8,1)
				for model in modelList:
					if model.ID==w[0]:
						model.listA=[]
						for i in range(model.skinVertCount):
							model.listA.append(g.i(2))
						tt=g.tell()	
						g.seek(t)
						for i in range(model.skinVertCount):
							indiceList=[]
							weightList=[]
							for j in range(model.listA[i][1]):
								weightList.append(g.f(1)[0])
								indiceList.append(g.i(1)[0])							
							model.skinIndiceList.append(indiceList)
							model.skinWeightList.append(weightList)
						g.seek(tt)
			else:g.seek(data[1],1) 
			if g.tell()==g.fileSize():
				break 
	skeleton.draw()	
	for j,model in enumerate(modelList):
		for i,mesh in enumerate(model.meshList):
			mesh.name=modelName+'mesh-'+str(j)+'-'+str(i)
			if len(model.skinIndiceList)>0:
				for id in mesh.skinVertIDList:
					mesh.skinIndiceList.append(model.skinIndiceList[id])
					mesh.skinWeightList.append(model.skinWeightList[id])
				skin=Skin()	
				skin.boneMap=skeleton.boneNameList
				mesh.skinList.append(skin)
			else:
				for mat in mesh.matList:
					if -1<mat.ID<len(matList):
						for m in range(len(mesh.vertPosList)):
							mesh.skinIndiceList.append([0])
							mesh.skinWeightList.append([1.0])
						skin=Skin()	
						skin.boneMap=[matList[mat.ID].boneParent]
						mesh.skinList.append(skin)	
			for mat in mesh.matList:
				if -1<mat.ID<len(matList):
					print 'IMAGE'
					#print 'image file:',matList[mat.ID].diffuse					
					mat.diffuse=matList[mat.ID].diffuse
					print 'szukam w katalogu:',g.dirname
					splitList=mat.diffuse.split(os.sep)
					if os.path.exists(mat.diffuse)==False:
						print splitList[-1],'...nie mam'
						dir=mat.diffuse.split(splitList[-2])[0]
						search=Searcher()
						search.what=splitList[-1]
						search.dir=dir
						print 'szukam w katalogu:',dir
						search.run()
						if len(search.list)>0:
							mat.diffuse=search.list[0]
							print mat.diffuse,'....mam'
						else:
							print splitList[-1],'...nie mam'
							dir=mat.diffuse.split(splitList[-3])[0]
							search=Searcher()
							search.what=splitList[-1]
							search.dir=dir
							print 'szukam w katalogu:',dir
							search.run()
							if len(search.list)>0:
								mat.diffuse=search.list[0]
								print mat.diffuse,'....mam'
							else:
								print splitList[-1],'...nie mam'
								dir=mat.diffuse.split(splitList[-4])[0]
								search=Searcher()
								search.what=splitList[-1]
								search.dir=dir
								print 'szukam w katalogu:',dir
								search.run()
								if len(search.list)>0:
									mat.diffuse=search.list[0]
									print mat.diffuse,'....mam'
								else:
									print splitList[-1],'...nie mam'
							
					else:
						print splitList[-1],'...mam'
			mesh.BINDSKELETON=skeleton.name	
			mesh.draw() 
	Blender.Window.RedrawAll	
	
			
	
	
def xsmParser(filename,g):
	skeleton=None
	scene = bpy.data.scenes.active
	for object in scene.objects:
		if object.type=='Armature':
			if '-body-skeleton' in object.name:
				skeleton=object.name
				break
	if skeleton is not None:	
	
		g.word(4)   
		g.H(16)
		g.word(g.i(1)[0])
		g.word(g.i(1)[0])
		g.word(g.i(1)[0])
		g.i(1)
		num = 0
		
		action=Action()
		action.name=g.basename
		action.skeleton=skeleton
		action.BONESPACE=True
		action.BONESORT=True
		#action.ARMATURESPACE=True
		
		while(True):
			data = g.i(3)
			back = g.tell()
			if data[0]==202:
				bones_count=g.i(1)[0]
				for m in range(bones_count):
					t=g.tell()
					g.f(20)
					data1=g.i(4)
					g.seek(t+100)
					name=g.word(g.i(1)[0])
					abone=ActionBone()
					abone.name=name
					
					for i in range(data1[0]):	 
						loc = g.f(3)
						posmatrix=VectorMatrix(loc)
						abone.posKeyList.append(posmatrix)
						time =  int(g.f(1)[0]*45)
						abone.posFrameList.append(time)
					for i in range(data1[1]):
						rotmatrix=QuatMatrix(g.short(4,'h',15)).resize4x4()	
						abone.rotKeyList.append(rotmatrix)
						time =  int(g.f(1)[0]*45)					
						abone.rotFrameList.append(time)	
						
					for i in range(data1[2]):
						g.f(3),round(g.f(1)[0]*45,0)
					for i in range(data1[3]):
						g.h(4),round(g.f(1)[0]*45,0)
					action.boneList.append(abone)
			if g.tell()==g.fileSize():break 
			
		action.draw() 
		action.setContext()	
		g.tell()	
	
	
	
	
	
def Parser():	
	filename=input.filename
	print
	print filename
	print 
	ext=filename.split('.')[-1].lower()	
	
	if ext=='msh':
		file=open(filename,'rb')
		g=BinaryReader(file)
		mshParser(filename,g)
		file.close()
	
	if ext=='xac':
		id=ParseID()
		
		if '_hair_' in os.path.basename(filename).lower(): 
			file=open(filename,'rb')
			g=BinaryReader(file)
			xacParser(filename,g,str(id)+'-hair-')
			file.close() 
			
			
			scene = bpy.data.scenes.active
			poseSkeleton=None
			for object in scene.objects:
				if object.type=='Armature':
					if '-hair-' in object.name:
						id=object.name.split('-')[0]
						hairbindSkeleton=Blender.Object.Get(id+'-hair-skeleton')
						poseSkeleton=None
						for object in scene.objects:
							if object.type=='Armature':
								if '-body-skeleton' in object.name:
									poseSkeleton=object
						if poseSkeleton is not None:			
							if 'Bip01 Head' in poseSkeleton.getData().bones.keys():
								hairbindSkeleton.setMatrix(poseSkeleton.getData().bones['Bip01 Head'].matrix['ARMATURESPACE']*hairbindSkeleton.matrixWorld)
								poseSkeleton.makeParentBone([hairbindSkeleton],'Bip01 Head',0,0)
			
			
		
		elif '_head_' in os.path.basename(filename).lower(): 
			file=open(filename,'rb')
			g=BinaryReader(file)
			xacParser(filename,g,str(id)+'-head-')
			file.close() 
			scene = bpy.data.scenes.active
			poseSkeleton=None
			for object in scene.objects:
				if object.type=='Armature':
					if '-head-' in object.name:
						id=object.name.split('-')[0]
						headbindSkeleton=Blender.Object.Get(id+'-head-skeleton')
						poseSkeleton=None
						for object in scene.objects:
							if object.type=='Armature':
								if '-body-skeleton' in object.name:
									poseSkeleton=object
						if poseSkeleton is not None:			
							if 'Bip01 Head' in poseSkeleton.getData().bones.keys():
								headbindSkeleton.setMatrix(poseSkeleton.getData().bones['Bip01 Head'].matrix['ARMATURESPACE']*headbindSkeleton.matrixWorld)
								poseSkeleton.makeParentBone([headbindSkeleton],'Bip01 Head',0,0)
		
		elif '_set' in filename:
			hairPath=filename.lower().replace('_set','_hair_std')
			if os.path.exists(hairPath)==True:
				file=open(hairPath,'rb')
				g=BinaryReader(file)
				xacParser(hairPath,g,str(id)+'-hair-')
				file.close()
				
			headPath=filename.lower().replace('_set','_head_std')
			if os.path.exists(headPath)==True:
				file=open(headPath,'rb')
				g=BinaryReader(file)
				xacParser(headPath,g,str(id)+'-head-')
				file.close()
			file=open(filename,'rb')
			g=BinaryReader(file)
			xacParser(filename,g,str(id)+'-body-')
			file.close()
			scene = bpy.data.scenes.active
			poseSkeleton=None
			for object in scene.objects:
				if object.type=='Armature':
					if '-hair-' in object.name:
						id=object.name.split('-')[0]
						hairbindSkeleton=Blender.Object.Get(id+'-hair-skeleton')
						poseSkeleton=Blender.Object.Get(id+'-body-skeleton')
						if 'Bip01 Head' in poseSkeleton.getData().bones.keys():
							hairbindSkeleton.setMatrix(poseSkeleton.getData().bones['Bip01 Head'].matrix['ARMATURESPACE']*hairbindSkeleton.matrixWorld)
							poseSkeleton.makeParentBone([hairbindSkeleton],'Bip01 Head',0,0)
					if '-head-' in object.name:
						id=object.name.split('-')[0]
						headbindSkeleton=Blender.Object.Get(id+'-head-skeleton')
						poseSkeleton=Blender.Object.Get(id+'-body-skeleton')
						if 'Bip01 Head' in poseSkeleton.getData().bones.keys():
							headbindSkeleton.setMatrix(poseSkeleton.getData().bones['Bip01 Head'].matrix['ARMATURESPACE']*headbindSkeleton.matrixWorld)
							poseSkeleton.makeParentBone([headbindSkeleton],'Bip01 Head',0,0)
		else:
			file=open(filename,'rb')
			g=BinaryReader(file)
			xacParser(filename,g,str(id)+'-body-')
			file.close()
			scene = bpy.data.scenes.active
			poseSkeleton=None
			for object in scene.objects:
				if object.type=='Armature':
					if '-body-skeleton' in object.name:
						poseSkeleton=object
			if poseSkeleton is not None:
				for object in scene.objects:
					if object.type=='Armature':			
						if '-hair-' in object.name:
							id=object.name.split('-')[0]
							hairbindSkeleton=Blender.Object.Get(id+'-hair-skeleton')
							if 'Bip01 Head' in poseSkeleton.getData().bones.keys():
								hairbindSkeleton.setMatrix(poseSkeleton.getData().bones['Bip01 Head'].matrix['ARMATURESPACE']*hairbindSkeleton.matrixWorld)
								poseSkeleton.makeParentBone([hairbindSkeleton],'Bip01 Head',0,0)
						if '-head-' in object.name:
							id=object.name.split('-')[0]
							headbindSkeleton=Blender.Object.Get(id+'-head-skeleton')
							if 'Bip01 Head' in poseSkeleton.getData().bones.keys():
								headbindSkeleton.setMatrix(poseSkeleton.getData().bones['Bip01 Head'].matrix['ARMATURESPACE']*headbindSkeleton.matrixWorld)
								poseSkeleton.makeParentBone([headbindSkeleton],'Bip01 Head',0,0)
			"""for object in scene.objects:
				if object.type=='Armature':
					if '-body-' in object.name:
						matrix=Euler(90,0,0).toMatrix().resize4x4()
						matrix*=Euler(0,0,180).toMatrix().resize4x4()
						object.setMatrix(matrix*object.matrixWorld)"""
					
		Blender.Window.RedrawAll()				
	
	if ext=='xsm':
		file=open(filename,'rb')
		g=BinaryReader(file)
		xsmParser(filename,g)
		file.close()
 
def openFile(flagList):
	global input,output
	input=Input(flagList)
	output=Output(flagList)
	parser=Parser()
	
Blender.Window.FileSelector(openFile,'import','Tree of Savior files *.xac, *.xsm')
