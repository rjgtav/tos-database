import random

import Blender
import bpy
from Blender.Mathutils import *

from myFunction import *

#print 'meshLib'



"""import Blender
from Blender.Mathutils import *


armA=Blender.Object.Get('A')
armB=Blender.Object.Get('B')

bonesA=armA.getData().bones
bonesB=armB.getData().bones

for bone in bonesA.values():
	bone.matrix['ARMATURESPACE']
	
objC=Blender.Object.Get('Cube')


print
#matA=bonesA['b'].matrix['ARMATURESPACE']*armA.matrixWorld
#print matA
print
#matB=bonesB['b'].matrix['ARMATURESPACE']*armB.matrixWorld
#print matB		
		
		
		
		
		
		
mesh=objC.getData(mesh=1)
for vert in mesh.verts:
	index=vert.index
	skinList=mesh.getVertexInfluences(index)
	vco=vert.co.copy()*objC.matrixWorld
	sum=Vector()
	#print index
	for skin in skinList:
		bone=skin[0]
		weight=skin[1]
		
		matA=bonesA[bone].matrix['ARMATURESPACE']*armA.matrixWorld
		matB=bonesB[bone].matrix['ARMATURESPACE']*armB.matrixWorld
		sum+=vco*matA.invert()*matB*weight
		
		#print vco	
		#print vco*matA.invert()*matB*weight	
		
	vert.co=sum
	#vert.co=vco
	
mesh.update()
Blender.Window.RedrawAll()	"""








			
class Mesh():
	
	def __init__(self):
		self.vertPosList=[]
		self.vertNormList=[]
		
		self.indiceList=[]
		self.faceList=[]
		self.triangleList=[]
		
		self.matList=[]
		self.matIDList=[]
		self.vertUVList=[]
		self.faceUVList=[]
		
		self.skinList=[]
		self.skinWeightList=[]
		self.skinIndiceList=[]
		self.skinIDList=[]
		self.bindPoseMatrixList=[]
		self.boneNameList=[]
		
		self.name=None
		self.mesh=None
		self.object=None
		self.TRIANGLE=False
		self.QUAD=False
		self.TRISTRIP=False
		self.BINDSKELETON=None
		self.BINDPOSESKELETON=None
		self.matrix=None
		self.SPLIT=False
		self.WARNING=False
		self.DRAW=False
		self.SETBOX=None
		self.BINDPOSE=False
		self.UVFLIP=False
		
	def update(self):
		pass
		
	def setBox(self):
		E=[[],[],[]]
		for n in range(len(self.vertPosList)):
			x,y,z=self.vertPosList[n]
			E[0].append(x)
			E[1].append(y)
			E[2].append(z)	
		skX=(self.SETBOX[3]-self.SETBOX[0])/(max(E[0])-min(E[0]))
		skY=(self.SETBOX[4]-self.SETBOX[1])/(max(E[1])-min(E[1]))
		skZ=(self.SETBOX[5]-self.SETBOX[2])/(max(E[2])-min(E[2]))
		sk=min(skX,skY,skZ)
		trX=(self.SETBOX[3]+self.SETBOX[0])/2
		trY=(self.SETBOX[4]+self.SETBOX[1])/2
		trZ=(self.SETBOX[5]+self.SETBOX[2])/2
		
		
		for n in range(len(self.vertPosList)):
			x,y,z=self.vertPosList[n]
			self.vertPosList[n]=[trX+x*skX,trY+y*skY,trZ+z*skZ]
		
		
		
	def addMat(self,mat,mesh,matID):
		if mat.name is None:
			mat.name=self.name+'-mat-'+str(matID)
		blendMat=Blender.Material.New(mat.name)
		blendMat.diffuseShader=Blender.Material.Shaders.DIFFUSE_ORENNAYAR
		blendMat.specShader=Blender.Material.Shaders.SPEC_WARDISO
		blendMat.setRms(0.04)
		blendMat.shadeMode=Blender.Material.ShadeModes.CUBIC
		blendMat.rgbCol=mat.rgba[:3]
		#print blendMat.rgbCol
		blendMat.alpha = mat.rgba[3]
		if mat.ZTRANS==True:
			blendMat.mode |= Blender.Material.Modes.ZTRANSP
			blendMat.mode |= Blender.Material.Modes.TRANSPSHADOW 
			blendMat.alpha = 0.0 
		if mat.diffuse is not None:
			diffuse(blendMat,mat)
		if mat.reflection is not None:
			reflection(blendMat,mat)
		if mat.diffuse1 is not None:
			diffuse1(blendMat,mat)
		if mat.diffuse2 is not None:
			diffuse2(blendMat,mat)
		if mat.specular is not None:
			specular(blendMat,mat)
		if mat.normal is not None:
			normal(blendMat,mat)
		if mat.normal1 is not None:
			normal1(blendMat,mat)
		if mat.normal2 is not None:
			normal2(blendMat,mat)
		if mat.ao is not None:
			ao(blendMat,mat)
		if mat.alpha is not None:
			alpha(blendMat,mat)
		mesh.materials+=[blendMat]	
		if self.WARNING==True:
			print 'class<MAt>.name:',mat.name
			print 'class<MAt>.ZTRANS:',mat.ZTRANS
			if mat.diffuse is not None:
				print 'class<MAt>.diffuse:',mat.diffuse
			if mat.specular is not None:
				print 'class<MAt>.specular:',mat.specular
			if mat.normal is not None:
				print 'class<MAt>.normal:',mat.normal
			if mat.ao is not None:
				print 'class<MAt>.ao:',mat.ao
		
		
	def addvertexUV(self,blenderMesh,mesh): 
		blenderMesh.vertexUV = 1
		for m in range(len(blenderMesh.verts)):
			if self.UVFLIP==False:
				blenderMesh.verts[m].uvco = Vector(mesh.vertUVList[m][0],1-mesh.vertUVList[m][1])	
			else:
				blenderMesh.verts[m].uvco = Vector(mesh.vertUVList[m])
		
		
	def addfaceUV(self,blenderMesh,mesh):
		if self.WARNING==True:
			print 'WARNING: blenderMesh.faces:',len(blenderMesh.faces)
		if len(blenderMesh.faces)>0:
			blenderMesh.faceUV = 1
			if len(mesh.vertUVList)>0:
				for ID in range(len(blenderMesh.faces)):			
					face=blenderMesh.faces[ID]
					face.uv = [v.uvco for v in face.verts]
					face.smooth = 1
					if len(mesh.matIDList)>0:
						face.mat=mesh.matIDList[ID] 
			if len(mesh.matIDList)>0:
				for ID in range(len(blenderMesh.faces)):	
					face=blenderMesh.faces[ID]
					face.smooth = 1 
					face.mat=mesh.matIDList[ID]
			if len(mesh.faceUVList)>0:
				for ID in range(len(blenderMesh.faces)): 
					face=blenderMesh.faces[ID]
					if mesh.faceUVList[ID] is not None:
						face.uv=mesh.faceUVList[ID]
			if len(self.vertNormList)==0:			
				blenderMesh.calcNormals()	
			blenderMesh.update() 
	
	def addSkinIDList(self):
		if len(self.skinIDList)==0:
			for skinID in range(len(self.skinList)):
				skin=self.skinList[skinID]
				if skin.IDStart==None:
					skin.IDStart=0
				if skin.IDCount==None:
					skin.IDCount=len(self.skinIndiceList)
				for vertID in range(skin.IDCount):
					self.skinIDList.append(skinID)
				if self.WARNING==True:
					print '\t','class<Skin>.boneMap:',len(skin.boneMap)
					print '\t'*2,'class<Skin>.IDStart:',skin.IDStart
					print '\t'*2,'class<Skin>.IDCount:',skin.IDCount
					print '\t'*2,'class<Skin>.skinIDList:',len(self.skinIDList)
					
		else:
			if self.WARNING==True:
				print '\t'*2,'class<Skin>.skinIDList:',len(self.skinIDList)
				for skinID in range(len(self.skinList)):
					skin=self.skinList[skinID]
					print '\t','class<Skin>.boneMap:',len(skin.boneMap)
			
				
		
	def addSkin(self,blendMesh,mesh):
				
		for vertID in range(len(mesh.skinIDList)):
			indices=mesh.skinIndiceList[vertID]
			weights=mesh.skinWeightList[vertID]
			skinID=mesh.skinIDList[vertID]
			for n in range(len(indices)):
				w  = weights[n]
				if type(w)==int:w=w/255.0
				if w!=0:
					grID = indices[n]
					if len(self.boneNameList)==0:
						if len(self.skinList[skinID].boneMap)>0:
							grName = str(self.skinList[skinID].boneMap[grID])
						else:	
							grName = str(grID)
					else:	
						if len(self.skinList[skinID].boneMap)>0:
							grNameID = self.skinList[skinID].boneMap[grID]
							grName=self.boneNameList[grNameID]
						else:	
							grName=self.boneNameList[grID]
					if grName not in blendMesh.getVertGroupNames():
						blendMesh.addVertGroup(grName)
					blendMesh.assignVertsToGroup(grName,[vertID],w,1)
		blendMesh.update()
			
		
	def addBindPose(self,blendMesh,mesh):
		#print 'BINDPOSE'
		poseBones=None
		poseSkeleton=None
		bindBones=None
		bindSkeleton=None
		if self.BINDPOSESKELETON is not None:
			scene = bpy.data.scenes.active
			for object in scene.objects:
				if object.name==self.BINDPOSESKELETON:
					poseBones=object.getData().bones
					poseSkeleton=object
		if self.BINDSKELETON is not None:
			scene = bpy.data.scenes.active
			for object in scene.objects:
				if object.name==self.BINDSKELETON:
					bindBones=object.getData().bones
					bindSkeleton=object
		if poseBones is not None and bindBones is not None:			
			#print 'addBindPose'
			#bindPoseMatrixList=mesh.bindPoseMatrixList				
			for vert in blendMesh.verts:
				index=vert.index
				skinList=blendMesh.getVertexInfluences(index)
				vco=vert.co.copy()*self.object.matrixWorld
				vector=Vector()
				#print index
				for skin in skinList:
					bone=skin[0]							
					weight=skin[1]
					
					#matrixIndex=mesh.boneNameList.index(bone)
					#matA=bindPoseMatrixList[matrixIndex]*self.object.matrixWorld
					matB=bindBones[bone].matrix['ARMATURESPACE']*bindSkeleton.matrixWorld
					matA=poseBones[bone].matrix['ARMATURESPACE']*poseSkeleton.matrixWorld
					#matB=TranslationMatrix(matB.translationPart())
					#matA=TranslationMatrix(matA.translationPart())
					vector+=vco*matA.invert()*matB*weight
					
					#print vco	
					#print vco*matA.invert()*matB*weight	
					
				vert.co=vector
				#vert.co=vco
				
			blendMesh.update()
			Blender.Window.RedrawAll()
				
				
				
		
	def addFaces(self): 
		if self.WARNING==True:
			print '\t','class<Mesh>.matList count:',len(self.matList)
			for matID in range(len(self.matList)):
				print '\t'*2,'class<Mat>.name:',self.matList[matID].name
				print '\t'*3,'class<Mat>.IDStart:',self.matList[matID].IDStart
				print '\t'*3,'class<Mat>.IDCount:',self.matList[matID].IDCount
		if len(self.matList)==0:
			if len(self.faceList)!=0:
				self.triangleList=self.faceList
			if len(self.indiceList)!=0:
				if self.TRIANGLE==True:
					self.indicesToTriangles(self.indiceList,0)
				elif self.QUAD==True:
					self.indicesToQuads(self.indiceList,0)
				elif self.TRISTRIP==True:
					self.indicesToTriangleStrips(self.indiceList,0)
				else:
					if self.WARNING==True:
						print 'WARNING: class<Mesh>.TRIANGLE:',self.TRIANGLE 
						print 'WARNING: class<Mesh>.TRISTRIP:',self.TRISTRIP
				
					
		else:
			if len(self.faceList)>0:
				if len(self.matIDList)==0:
					for matID in range(len(self.matList)):
						mat=self.matList[matID] 
						if mat.IDStart is not None and mat.IDCount is not None:
							for faceID in range(mat.IDCount):
								self.triangleList.append(self.faceList[mat.IDStart+faceID])
								self.matIDList.append(matID)
						else:
							if mat.IDStart==None:
								mat.IDStart=0
							if mat.IDCount==None:
								mat.IDCount=len(self.faceList)
							for faceID in range(mat.IDCount):
								self.triangleList.append(self.faceList[mat.IDStart+faceID])
								self.matIDList.append(matID)
					#self.triangleList=self.faceList
							
								
				else:			
					self.triangleList=self.faceList
					#for ID in range(len(self.matIDList)):
					#	mat=self.matList[matID] 
						#if self.matIDList[ID]==matID:
					#	self.triangleList.append(self.faceList[ID])
						
			if len(self.indiceList)>0:
				for matID in range(len(self.matList)):
					mat=self.matList[matID] 
					if mat.IDStart==None:
						mat.IDStart=0
					if mat.IDCount==None:
						mat.IDCount=len(self.indiceList)
					indiceList=self.indiceList[mat.IDStart:mat.IDStart+mat.IDCount]					
					if mat.TRIANGLE==True:
						self.indicesToTriangles(indiceList,matID)
					elif mat.QUAD==True:
						self.indicesToQuads(indiceList,matID)
					elif mat.TRISTRIP==True:
						self.indicesToTriangleStrips(indiceList,matID)	
					
				
		if self.WARNING==True:
			print 'OUTPUT:'			
			print '\t','class<Mesh>.triangleList count:',len(self.triangleList)
			print '\t','class<Mesh>.matIDList count:',len(self.matIDList)

	def buildMesh(self,mesh,mat,meshID):
		if self.WARNING==True:print 'class<Mesh>.name:',mesh.name
		if self.WARNING==True:print '\t','class<Mesh>.vertPosList count:',len(mesh.vertPosList)
		if self.WARNING==True:print '\t','class<Mesh>.vertUVList count:',len(mesh.vertUVList)	
		if self.WARNING==True:print '\t','class<Mesh>.triangleList count:',len(mesh.triangleList)
		if self.WARNING==True:print '\t','class<Mesh>.indiceList count:',len(mesh.indiceList)
		blendMesh = bpy.data.meshes.new(mesh.name)
		blendMesh.verts.extend(mesh.vertPosList)
		blendMesh.faces.extend(mesh.triangleList)
		self.addMat(mat,blendMesh,meshID)	
		if len(mesh.triangleList)>0:	
			if len(mesh.vertUVList)>0:
				self.addvertexUV(blendMesh,mesh)
				self.addfaceUV(blendMesh,mesh)
			if len(mesh.faceUVList)>0:
				self.addfaceUV(blendMesh,mesh)
		if len(mesh.vertNormList)>0:
			for i,vert in enumerate(blendMesh.verts):
				vert.no=Vector(self.vertNormList[i])
			
		scene = bpy.data.scenes.active
		meshobject = scene.objects.new(blendMesh,mesh.name)
		self.addSkin(blendMesh,mesh)
		Blender.Window.RedrawAll()
		if self.BINDSKELETON is not None:
			for object in scene.objects:
				if object.name==self.BINDSKELETON:
					#meshobject.mat*=object.mat
					object.makeParentDeform([meshobject],1,0)
		if self.matrix is not None:
			meshobject.setMatrix(self.matrix*meshobject.matrixWorld)
		Blender.Window.RedrawAll()	
		
	def addMesh(self):
		self.mesh = bpy.data.meshes.new(self.name)
		self.mesh.verts.extend(self.vertPosList)
		if len(self.vertNormList)>0:
			for i,vert in enumerate(self.mesh.verts):
				vert.no=Vector(self.vertNormList[i])
		#else:		
		#	self.mesh.calcNormals()	
			
		self.mesh.faces.extend(self.triangleList,ignoreDups=True)
		scene = bpy.data.scenes.active
		self.object = scene.objects.new(self.mesh,self.name)
		#print len(self.mesh.faces)	
		"""for m in range(len(self.triangleList)):
			self.mesh.faces.extend(self.triangleList[m],ignoreDups=True)
			self.mesh.update()
			Blender.Window.Redraw()"""
		
	def boneTree(self,parent):
		for bone in parent.children:
			#self.boneNameList.append(bone.name)
			self.boneTree(bone)
			
		
	def draw(self): 
		if self.name is None:self.name=str(ParseID())+'-model-'+str(0)
		if self.WARNING==True:print 'class<Mesh>.name:',self.name
		if self.WARNING==True:print '\t','class<Mesh>.vertPosList count:',len(self.vertPosList)
		if self.WARNING==True:print '\t','class<Mesh>.vertUVList count:',len(self.vertUVList)
		if self.WARNING==True:print '\t','class<Mesh>.indiceList count:',len(self.indiceList)
		if self.WARNING==True:print '\t','class<Mesh>.faceList count:',len(self.faceList)		
		if self.WARNING==True:print '\t','class<Mesh>.triangleList count:',len(self.triangleList)
		if self.WARNING==True:print '\t','class<Mesh>.faceUVList count:',len(self.faceUVList)
		self.addFaces() 
			
		if self.WARNING==True:print '\t','class<Mesh>.SPLIT:',self.SPLIT
		self.addSkinIDList()
		if self.SETBOX is not None:
			self.setBox()
			
		if self.SPLIT==False:
			self.addMesh()	
			if len(self.triangleList)>0:	
				if len(self.vertUVList)>0:
					self.addvertexUV(self.mesh,self)
					#self.addfaceUV(self.mesh,self)
				#if len(self.faceUVList)>0:	
			self.addfaceUV(self.mesh,self)
			for matID in range(len(self.matList)):
				mat=self.matList[matID]
				self.addMat(mat,self.mesh,matID)
				
			if self.BINDSKELETON is not None:
				scene = bpy.data.scenes.active
				for object in scene.objects:
					if object.name==self.BINDSKELETON:
						skeletonMatrix=self.object.getMatrix()*object.mat
						#self.object.setMatrix(skeletonMatrix)
						object.makeParentDeform([self.object],1,0)
			self.addSkin(self.mesh,self)
			
			
			if self.matrix is not None:
				self.object.setMatrix(self.matrix*self.object.matrixWorld)
				
				
			if self.BINDPOSE==True:
				#if len(self.bindPoseMatrixList)>0:
				self.addBindPose(self.mesh,self)
				#else:
				#	print 'WARNING: mesh.bindPoseMatrixList: None'
			Blender.Window.RedrawAll()
			
		if self.SPLIT==True:			
			if self.WARNING==True:
				print 'MESH SPLITING PROCCES:'
			print 'split:True'	
			meshList=[]
			for matID in range(len(self.matList)):
				mesh=Mesh()
				mesh.idList={}
				mesh.id=0
				mesh.name=self.name+'-'+str(matID)
				meshList.append(mesh)
				for n in range(len(self.vertPosList)):
					mesh.idList[str(n)]=None					
					
			for faceID in range(len(self.matIDList)):
				matID=self.matIDList[faceID]
				#print matID
				mesh=meshList[matID]
				face=[]
				for v in range(len(self.triangleList[faceID])):
					vid=self.triangleList[faceID][v]
					if mesh.idList[str(vid)]==None:	  
						mesh.idList[str(vid)]=mesh.id
						mesh.vertPosList.append(self.vertPosList[vid])
						if len(self.vertUVList)>0:
							mesh.vertUVList.append(self.vertUVList[vid]) 
						if len(self.vertNormList)>0:
							mesh.vertNormList.append(self.vertNormList[vid]) 
						#if len(self.faceUVList)>0:
						#	mesh.faceUVList.append(self.faceUVList[vid]) 
						if len(self.skinIndiceList)>0 and len(self.skinWeightList)>0:	
							mesh.skinWeightList.append(self.skinWeightList[vid])
							mesh.skinIndiceList.append(self.skinIndiceList[vid])
							mesh.skinIDList.append(self.skinIDList[vid])	
						face.append(mesh.id) 
						mesh.id+=1
					else:
						oldid=mesh.idList[str(vid)] 
						face.append(oldid) 
				mesh.triangleList.append(face)
				if len(self.faceUVList)>0:
					mesh.faceUVList.append(self.faceUVList[faceID]) 
				mesh.matIDList.append(0)
				
				
				
				
			for meshID in range(len(meshList)):
				mesh=meshList[meshID]
				mat=self.matList[meshID]
				self.buildMesh(mesh,mat,meshID)
			Blender.Window.RedrawAll()
				
				
				
	def indicesToQuads(self,indicesList,matID):
		for m in range(0, len(indicesList), 4):
			self.triangleList.append(indicesList[m:m+4] )
			self.matIDList.append(matID)
				
	def indicesToTriangles(self,indicesList,matID):
		for m in range(0, len(indicesList), 3):
			self.triangleList.append(indicesList[m:m+3] )
			self.matIDList.append(matID)
		

	def indicesToTriangleStrips(self,indicesList,matID):
		StartDirection = -1
		id=0
		f1 = indicesList[id]
		id+=1
		f2 = indicesList[id]
		FaceDirection = StartDirection
		while(True):
		#for m in range(len(indicesList)-2):
			id+=1
			f3 = indicesList[id]
			#print f3
			if (f3==0xFFFF):
				if id==len(indicesList)-1:break
				id+=1
				f1 = indicesList[id]
				id+=1
				f2 = indicesList[id]
				FaceDirection = StartDirection	 
			else:
				#f3 += 1
				FaceDirection *= -1
				if (f1!=f2) and (f2!=f3) and (f3!=f1):
					if FaceDirection > 0:						
						self.triangleList.append([(f1),(f2),(f3)])
						self.matIDList.append(matID)
					else:
						self.triangleList.append([(f1),(f3),(f2)])
						self.matIDList.append(matID)
					if self.DRAW==True: 
						f1,f2,f3	
				f1 = f2
				f2 = f3
			if id==len(indicesList)-1:break

				
def diffuse(blendMat,data):
		if os.path.exists(data.diffuse)==True:
			img=Blender.Image.Load(data.diffuse)
			imgName=blendMat.name.replace('-mat-','-diff-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-diff-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			blendMat.setTexture(data.DIFFUSESLOT,tex,Blender.Texture.TexCo.UV,\
			Blender.Texture.MapTo.COL| Blender.Texture.MapTo.ALPHA|Blender.Texture.MapTo.CSP)	
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.diffuse

				
def reflection(blendMat,data):
		if os.path.exists(data.reflection)==True:
			img=Blender.Image.Load(data.reflection)
			imgName=blendMat.name.replace('-mat-','-refl-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-refl-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			blendMat.setTexture(data.REFLECTIONSLOT,tex,Blender.Texture.TexCo.REFL,Blender.Texture.MapTo.COL)	
			mtextures = blendMat.getTextures() 
			mtex=mtextures[data.REFLECTIONSLOT]
			mtex.colfac=data.REFLECTIONSTRONG
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.reflection

				
def alpha(blendMat,data):
		if os.path.exists(data.alpha)==True:
			img=Blender.Image.Load(data.alpha)
			imgName=blendMat.name.replace('-mat-','-alpha-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-alpha-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.setImageFlags('CalcAlpha')
			tex.image = img 
			blendMat.setTexture(data.ALPHASLOT,tex,Blender.Texture.TexCo.UV,\
			Blender.Texture.MapTo.ALPHA)
			#blendMat.getTextures()[data.DIFFUSESLOT].mtAlpha=0 
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.diffuse
			
def diffuse1(blendMat,data):
		if os.path.exists(data.diffuse1)==True:
			img=Blender.Image.Load(data.diffuse1)
			imgName=blendMat.name.replace('-mat-','-diff-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-diff-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			blendMat.setTexture(data.DIFFUSE1SLOT,tex,Blender.Texture.TexCo.UV,\
			Blender.Texture.MapTo.COL|Blender.Texture.MapTo.CSP)
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.diffuse1
			
def diffuse2(blendMat,data):
		if os.path.exists(data.diffuse2)==True:
			img=Blender.Image.Load(data.diffuse2)
			imgName=blendMat.name.replace('-mat-','-diff-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-diff-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			blendMat.setTexture(data.DIFFUSE2SLOT,tex,Blender.Texture.TexCo.UV,\
			Blender.Texture.MapTo.COL|Blender.Texture.MapTo.CSP)
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.diffuse1
			
def normal(blendMat,data): 
		if os.path.exists(data.normal)==True:
			img=Blender.Image.Load(data.normal)
			imgName=blendMat.name.replace('-mat-','-norm-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-norm-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			tex.setImageFlags('NormalMap')
			blendMat.setTexture(data.NORMALSLOT,tex,Blender.Texture.TexCo.UV,Blender.Texture.MapTo.NOR)
			blendMat.getTextures()[data.NORMALSLOT].norfac=data.NORMALSTRONG 
			blendMat.getTextures()[data.NORMALSLOT].mtNor=data.NORMALDIRECTION 
			blendMat.getTextures()[data.NORMALSLOT].size=data.NORMALSIZE
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.normal 
		
def specular(blendMat,data):
		if os.path.exists(data.specular)==True:
			img=Blender.Image.Load(data.specular)
			imgName=blendMat.name.replace('-mat-','-spec-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-spec-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			blendMat.setTexture(data.SPECULARSLOT,tex,Blender.Texture.TexCo.UV,Blender.Texture.MapTo.CSP)	
			mtextures = blendMat.getTextures() 
			mtex=mtextures[data.SPECULARSLOT]
			mtex.neg=True
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.specular		
			
def ao(blendMat,data):
		if os.path.exists(data.ao)==True:
			img=Blender.Image.Load(data.ao)
			imgName=blendMat.name.replace('-mat-','-ao-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-ao-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			blendMat.setTexture(data.AOSLOT,tex,Blender.Texture.TexCo.UV,Blender.Texture.MapTo.COL) 
			mtex=blendMat.getTextures()[data.AOSLOT]
			mtex.blendmode=Blender.Texture.BlendModes.MULTIPLY
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.ao	
			
def normal1(blendMat,data): 
		if os.path.exists(data.normal1)==True:
			img=Blender.Image.Load(data.normal1)
			imgName=blendMat.name.replace('-mat-','-norm1-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-norm1-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			tex.setImageFlags('NormalMap')
			blendMat.setTexture(data.NORMAL1SLOT,tex,Blender.Texture.TexCo.UV,Blender.Texture.MapTo.NOR)
			blendMat.getTextures()[data.NORMAL1SLOT].norfac=data.NORMAL1STRONG 
			blendMat.getTextures()[data.NORMAL1SLOT].mtNor=data.NORMAL1DIRECTION 
			blendMat.getTextures()[data.NORMAL1SLOT].size=data.NORMAL1SIZE 
		##else:
		#	if self.WARNING==True:
		#		print 'failed...',data.normal1	
				
def normal2(blendMat,data): 
		if os.path.exists(data.normal2)==True:
			img=Blender.Image.Load(data.normal2)
			imgName=blendMat.name.replace('-mat-','-norm2-')
			img.setName(imgName)
			texname=blendMat.name.replace('-mat-','-norm2-')
			tex = Blender.Texture.New(texname)
			tex.setType('Image')
			tex.image = img 
			tex.setImageFlags('NormalMap')
			blendMat.setTexture(data.NORMAL2SLOT,tex,Blender.Texture.TexCo.UV,Blender.Texture.MapTo.NOR)
			blendMat.getTextures()[data.NORMAL2SLOT].norfac=data.NORMAL2STRONG 
			blendMat.getTextures()[data.NORMAL2SLOT].mtNor=data.NORMAL2DIRECTION 
			blendMat.getTextures()[data.NORMAL2SLOT].size=data.NORMAL2SIZE 
		#else:
		#	if self.WARNING==True:
		#		print 'failed...',data.normal2	
		
	
					
class Skin:
	def __init__(self):
		self.boneMap=[]
		self.IDStart=None
		self.IDCount=None
		self.skeleton=None
		self.skeletonFile=None
			

		
class Mat:
	def __init__(self):#0,1,2,3,4,5,6,7,
		self.name=None
		self.ZTRANS=False
		
		self.diffuse=None
		self.DIFFUSESLOT=0
		
		self.diffuse1=None
		self.DIFFUSE1SLOT=6
		self.diffuse2=None
		self.DIFFUSE2SLOT=7
		self.alpha=None
		self.ALPHASLOT=8
		
		self.normal=None
		self.NORMALSLOT=1
		self.NORMALSTRONG=0.5
		self.NORMALDIRECTION=1
		self.NORMALSIZE=(1,1,1) 
		
		self.specular=None
		self.SPECULARSLOT=2
		
		self.ao=None
		self.AOSLOT=3
		
		self.normal1=None
		self.NORMAL1SLOT=4
		self.NORMAL1STRONG=0.8
		self.NORMAL1DIRECTION=1
		self.NORMAL1SIZE=(15,15,15) 
		
		self.normal2=None
		self.NORMAL2SLOT=5
		self.NORMAL2STRONG=0.8
		self.NORMAL2DIRECTION=1
		self.NORMAL2SIZE=(15,15,15) 
		
		self.reflection=None
		self.REFLECTIONSLOT=8
		self.REFLECTIONSTRONG=1.0
		
		#self.USEDTRIANGLES=[None,None]
		self.TRIANGLE=False
		self.TRISTRIP=False
		self.QUAD=False
		self.IDStart=None
		self.IDCount=None
		self.faceIDList=[]
		
		r=random.randint(0,255)
		g=random.randint(0,255)
		b=random.randint(0,255)
		self.rgba=[r/255.0,g/255.0,b/255.0,1.0]
		
	def draw(self): 
		if self.name is None:
			self.name=str(ParseID())+'-mat-'+str(0)
		blendMat=Blender.Material.New(self.name)
		blendMat.diffuseShader=Blender.Material.Shaders.DIFFUSE_ORENNAYAR
		blendMat.specShader=Blender.Material.Shaders.SPEC_WARDISO
		blendMat.setRms(0.04)
		blendMat.shadeMode=Blender.Material.ShadeModes.CUBIC
		if self.ZTRANS==True:
			blendMat.mode |= Blender.Material.Modes.ZTRANSP
			blendMat.mode |= Blender.Material.Modes.TRANSPSHADOW
			blendMat.alpha = 0.0 
		if self.diffuse is not None:diffuse(blendMat,self)
		if self.reflection is not None:reflection(blendMat,self)
		if self.diffuse1 is not None:diffuse1(blendMat,self)
		if self.diffuse2 is not None:diffuse2(blendMat,self)
		if self.specular is not None:specular(blendMat,self)
		if self.normal is not None:normal(blendMat,self)
		if self.normal1 is not None:normal1(blendMat,self)
		if self.normal2 is not None:normal2(blendMat,self)
		if self.ao is not None:ao(blendMat,self)
		if self.alpha is not None:alpha(blendMat,self)	
