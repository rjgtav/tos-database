
class Node:
	def __init__(self):
		self.ID=None
		self.name=None		
		self.parent=None#name albo [] albo id albo str
		self.children=[]
		self.parentID=None
		self.key=None
		self.values=None
		self.line=None
		self.chunks=None
		


class Xml():
	"""
	init:
		self.nodes=[]
		self.input=None
		self.keys=[]
		self.info={}
		self.root=None
		self.DRAWCONSOLE=False
		
	objects:
		def chunks(self,lineID):
		def tree(self,n,parentNode):
	parse():
		def nextnode(self,node,key):
	find(node,key):
	
	
	class Node:
		def __init__(self):
			self.ID=None
			self.name=None		
			self.parent=None#name albo [] albo id albo str
			self.children=[]
			self.parentID=None
			self.key=None
			self.values=None
			self.line=None
			
			
	exaple:		
		def xmlParser(filename,file):
			xml=Xml()
			xml.input=file
			xml.parse()
			print xml.keys
			xml.root.children
			matList=xml.find(xml.root,'MATERIAL')
			for node in matList:
				texList=xml.find(node,'TEXTURELIST')
				for node in texList:
					layerList=xml.find(node,'TEXTURELAYER')
					for layer in layerList:
						for child in layer.children:
							print child.line 
							
			matList=xml.find(xml.root,'MATERIAL')
			for node in matList:
					layerList=xml.find(node,'TEXTURELAYER')
					for layer in layerList:
						for child in layer.children:
							print child.line 
	
	"""
	def __init__(self):
		self.nodes=[]
		self.input=None
		self.keys=[]
		self.root=None
		self.DRAWCONSOLE=False
		
		
		
	def chunks(self,lineID):
		chunk_list = {} 
		line = lines[lineID]
		if "'" not in line:
			sep = line.split('"')
			#print sep
			for id in range(len(sep)):
				m=sep[id]
				if '=' in m:
					#print m
					chunk_name  = m.split('=')[0].split()[-1]
					chunk_value = sep[id+1]
					chunk_list[chunk_name] = chunk_value
		return chunk_list
		
		
	def tree(self,n,parentNode):
		global lineID
		n+=4
		while(True):
			if lineID >= len(lines):
				break
			line = lines[lineID]
			count_open = line.count('<')
			count_close_1= line.count('/>')
			count_close_2= line.count('</')*2
			eta = count_open-(count_close_1+count_close_2)
			if self.DRAWCONSOLE==True:
				print '-'*n,lineID,line.strip(),eta
			node=Node()
			node.ID=lineID
			node.parentID=parentNode.ID
			node.chunks=self.chunks(lineID)
			node.line=line
			node.key=''
			lineID+=1
			if eta == -1:
				#values=line.split('</')[0].strip()
				#if len(values)>0:
				#	node.values=values
				break
			if eta ==1:
				sep = line.split() 
				key = sep[0].split('<')[1]
				key = key.split('>')[0]
				if key not in self.keys:
					self.keys.append(key)
				node.key=key
				#values=line.split('>')[1].strip()
				#if len(values)>0:
				#	node.values=values
				self.tree(n,node)	
			if eta ==0:
				if '<' in line:
					sep = line.split() 
					key = sep[0].split('<')[1]
					key = key.split('>')[0]
					node.key=key
					node.values=line.split('>')[1].split('</')[0]
				else:
					node.values=line.strip()
					
			parentNode.children.append(node)		
		
	def parse(self):
		global lineID
		global lines
		if self.input is not None:
			lines=self.input.readlines()
			lineID = 0
			node=Node()
			self.root=node
			node.ID=lineID
			node.parentID=-1
			n=0  
			self.tree(n,node)
			
	def nextnode(self,node,key):
		children=node.children
		for child in children:
			child.key
			if child.key!=key:
				self.nextnode(child,key)
			else:
				list.append(child)			
			
	def find(self,node,key):
		global list
		list=[]
		children=node.children
		for child in children:
			child.key
			if child.key!=key:
				self.nextnode(child,key)
			else:
				list.append(child)
		return list	
			
	def get(self,node,key):
		global list
		list=[]
		children=node.children
		for child in children:
			child.key
			if child.key!=key:
				self.nextnode(child,key)
			else:
				list.append(child)
				
		if len(list)==0:
			return None
		else:	
			return list[0]		