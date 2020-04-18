import zlib

import Blender
import os


def inflate(data):
    decompress = zlib.decompressobj(
            -zlib.MAX_WBITS  # see above
    )
    inflated = decompress.decompress(data)
    inflated += decompress.flush()
    return inflated	

class Unpacker:
	"""
	'Unpacker'
	self.fileCount=None
	self.nameList=[]
	self.offsetlist=[]
	self.sizeList=[]
	self.filecomtypelist=[]
	self.ZLIB=True
	self.outputDir=''
	self.inputFile=None
	"""
	def __init__(self):
		self.fileCount=None
		self.nameList=[]
		self.offsetList=[]
		self.sizeList=[]
		self.dataList=[]
		self.compTypeList=[]
		self.ZLIB=False
		self.INFLATE=False
		self.outputDir=None
		self.inputFile=None
	def unpack(self):		
		if self.ZLIB==True:
			import zlib
		if self.inputFile is not None:
			archive=open(self.inputFile,'rb')
			if self.outputDir is not None:
				if self.fileCount==len(self.dataList):
					for m in range(self.fileCount):
						newfiledir=self.outputDir+os.sep+Blender.sys.dirname(self.nameList[m])
						try:os.makedirs(newfiledir)
						except:pass			
						newfile=open(self.outputDir+os.sep+self.nameList[m],'wb')
						data=self.dataList[m]
						newfile.write(data)
						print self.nameList[m]
						newfile.close()
					
				if len(self.offsetList)==len(self.sizeList)==len(self.nameList):
					self.fileCount=len(self.nameList)
					for m in range(self.fileCount):
						archive.seek(self.offsetList[m],0)
						newfiledir=self.outputDir+os.sep+Blender.sys.dirname(self.nameList[m])
						try:os.makedirs(newfiledir)
						except:pass	
						newfile=open(self.outputDir+os.sep+self.nameList[m],'wb')
						if self.ZLIB==True:
							try:
								data=zlib.decompress(archive.read(self.sizeList[m]))
								newfile.write(data)
								print 'unpackING...',self.nameList[m]
							except:
								print 'ZLIB WARNING.NOT unpackED',self.nameList[m]
						elif self.INFLATE==True:	
							data=inflate(archive.read(self.sizeList[m]))
							newfile.write(data)
						else:
							data=archive.read(self.sizeList[m])
							newfile.write(data)
						print self.nameList[m]
						newfile.close()
				else:
					print 'MISSING....'
			else:
				print 'NO outputDir DIR'	
			archive.close()						
		else:
			print 'NO ARCHIVE'						
