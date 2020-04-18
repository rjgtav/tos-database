/*
 * Tree of Savior
 * .xac -> .obj
 * 2015-01-19
 */

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Locale;
import java.util.Scanner;

public class Xac2Obj {

	private static Scanner scanner;
	private static DataInputStream in = null;

	private static float readFloat(DataInputStream d) throws IOException {
		return Float.intBitsToFloat(readInt(d));
	}

	private static int readInt(DataInputStream d) throws IOException {
		byte w[] = new byte[4];
		d.readFully(w,0,4);
		return
			(w[3])		<< 24 |
			(w[2]&0xFF) << 16 |
			(w[1]&0xFF) <<	8 |
			(w[0]&0xFF);
	}

	private static String readString(DataInputStream d, int length) throws IOException {
		byte b[] = new byte[length];
		d.readFully(b,0,length);
		return new String(b);
	}

	public static void main(String[] args) {
		
		//int numObjects = 0;
		int objectIndex = 0;
		DecimalFormat df;
		
		Locale.setDefault(new Locale("en", "US"));
		df = new DecimalFormat("0.00000000");
		
		try {

			String filename;
			scanner = new Scanner(System.in);
			if (args.length != 1) {
				System.out.print("\n>");
				filename = scanner.next();
			} else {
				filename = args[0];
			}

			File file = new File(filename);
			if (!file.exists()) {
				System.out.println("\nFile "+filename+" doesn't exist!");
				System.exit(1);
			}
			
			filename = file.getAbsolutePath();

			in = new DataInputStream(new FileInputStream(filename));
			String magicWord = readString(in, 4);
			
			if (!magicWord.equals("XAC ")) {
				System.out.println("Not a valid XAC file!");
				exit();
			}
			
			in.skipBytes(4);
			
			boolean eof = false;
			while (!eof) {
				// read chunk header
				int id  = readInt(in);
				int len = readInt(in);
				int ver = readInt(in);
				
				System.out.println("Read chunk header. id: " + id + ", len: " + len + ", ver: " + ver);
				
				switch (id) {
				case 3: /*fallthrough*/
				case 7:
				case 11:
					in.skipBytes(len);
					break;
				case 13:
					in.skipBytes(4);
					in.skipBytes(4);
					//numObjects = readInt(in);
					//System.out.println("numObjects: " + numObjects);
					in.skipBytes(4);
					break;
				case 5:
					// material chunk
					// TODO: parse this chunk to obtain textures
					// TODO: read as string and use regex to extract the .dds at the end
					in.skipBytes(len);
					break;
				case 1:
					System.out.println("==========================================");
					
					// object chunk
					in.skipBytes(4); // Always 0
					in.skipBytes(4);
					int numVertices = readInt(in);
					int numFaces = readInt(in);
					int numObjects = readInt(in);
					int numVertexBlocks = readInt(in) - 1;
					in.skipBytes(4);
					in.skipBytes(4); // Always 5
					in.skipBytes(4); // Always 4
					in.skipBytes(2);
					in.skipBytes(2);
					//int numVertexBlocks = readInt(in); // TODO: c_klaipeda_fog tem 4 blocks, d_limestonecave_52_1_fog tem 5... algum destes bytes qe é skipped tem a soluçao
					System.out.println("Object chunk. numVertices: " + numVertices + ", numFaces: " + numFaces + ", numObjects: " + numObjects + ", numVertexBlocks: " + numVertexBlocks);
					
					in.skipBytes(numVertices * 4);
					
					boolean gotGeometry = false;
					boolean gotNormals = false;
					boolean gotUv = false;
					
					float geometry[] = new float[numVertices*3];
					float normals[]  = new float[numVertices*3];
					float uv[]       = new float[numVertices*2];
					int faces[]      = new int[numFaces];
					
					for (int i=0; i<numVertexBlocks; i++) {
						int blockId = readInt(in);
						int blockSize = readInt(in);
						in.skipBytes(4);
						System.out.println("Vertex Block. blockId: " + blockId + ", blockSize: " + blockSize);
						
						if (blockId == 0 && !gotGeometry) {
							for (int j=0; j<numVertices*3; j++) {
								geometry[j] = readFloat(in);
							}
							gotGeometry = true;
						} else if (blockId == 1 && !gotNormals) {
							for (int j=0; j<numVertices*3; j++) {
								normals[j] = readFloat(in);
							}
							gotNormals = true;
						} else if (blockId == 3 && !gotUv) {
							for (int j=0; j<numVertices*2; j++) {
								uv[j] = readFloat(in);
							}
							gotUv = true;
						} else {
							in.skipBytes(numVertices * blockSize);
						}
					}
					
					int numFacesCheck = 0;
					int numVerticesCheck = 0;
					
					for (; objectIndex < numObjects; objectIndex ++) {
						int numFacesObject = readInt(in);
						int numVerticesObject = readInt(in);
						in.skipBytes(4);
						in.skipBytes(4);
						System.out.println("Object chunk. numFacesObject: " + numFacesObject + ", numVerticesObject: " + numVerticesObject);
						
						for (int i=numFacesCheck; i<numFacesCheck+numFacesObject; i++) {
							faces[i] = readInt(in);
						}
						
						// create OBJ file
						FileWriter out = new FileWriter(new File(filename+"." + objectIndex + ".obj"));
						
						for (int i=numVerticesCheck; i<numVerticesCheck+numVerticesObject; i++) {
							out.write(String.format("v %s %s %s%n", df.format(geometry[i*3]), df.format(geometry[i*3+1]), df.format(geometry[i*3+2])));
						}
						out.write(String.format("%n"));
						
						for (int i=numVerticesCheck; i<numVerticesCheck+numVerticesObject; i++) {
							out.write(String.format("vn %s %s %s%n", df.format(normals[i*3]), df.format(normals[i*3+1]), df.format(normals[i*3+2])));
						}
						out.write(String.format("%n"));
						
						for (int i=numVerticesCheck; i<numVerticesCheck+numVerticesObject; i++) {
							out.write(String.format("vt %s %s%n", df.format(uv[i*2]), df.format(1 - uv[i*2+1])));
						}
						out.write(String.format("%n"));
						
						for (int i=numFacesCheck/3; i<(numFacesCheck+numFacesObject)/3; i++) {
							int a = faces[i*3]+1;
							int b = faces[i*3+1]+1;
							int c = faces[i*3+2]+1;
							out.write(String.format("f %d/%d/%d %d/%d/%d %d/%d/%d%n", a,a,a, b,b,b, c,c,c));
						}
						out.write(String.format("%n"));
						
						out.close();
						
						numFacesCheck += numFacesObject;
						numVerticesCheck += numVerticesObject;
					}
					
					if (numFacesCheck != numFaces || numVerticesCheck != numVertices) {
						System.out.println("Face/Vertex check failed!");
					} else {
						eof = true;
					}
					
					
					
					//if (numFacesCheck != numFaces || numVerticesCheck != numVertices) {
					//	System.out.println("Face/Vertex check failed!");
					//} else {
						/*
					if (true) {
						for (int i=0; i<numFaces; i++) {
							faces[i] = readInt(in);
						}
						
						// create OBJ file
						FileWriter out = new FileWriter(new File(filename+"." + objectIndex + ".obj"));
						
						for (int i=0; i<numVertices; i++) {
							out.write(String.format("v %s %s %s%n", df.format(geometry[i*3]), df.format(geometry[i*3+1]), df.format(geometry[i*3+2])));
						}
						out.write(String.format("%n"));
						
						for (int i=0; i<numVertices; i++) {
							out.write(String.format("vn %s %s %s%n", df.format(normals[i*3]), df.format(normals[i*3+1]), df.format(normals[i*3+2])));
						}
						out.write(String.format("%n"));
						
						for (int i=0; i<numVertices; i++) {
							out.write(String.format("vt %s %s%n", df.format(uv[i*2]), df.format(1 - uv[i*2+1])));
						}
						out.write(String.format("%n"));
						
						for (int i=0; i<numFaces/3; i++) {
							int a = faces[i*3]+1;
							int b = faces[i*3+1]+1;
							int c = faces[i*3+2]+1;
							out.write(String.format("f %d/%d/%d %d/%d/%d %d/%d/%d%n", a,a,a, b,b,b, c,c,c));
						}
						out.write(String.format("%n"));
						
						out.close();
						
						objectIndex++;
						
						if (objectIndex == numObjects) {
							eof = true;
						}
					}
					*/
					
					break;
				default:
					System.out.println(String.format("Unknown identifier: %d (length: %d, version: %d)", id, len, ver));
					in.skipBytes(len);
					break;
				}
				
			}
			exit();

		} catch (IOException e) {
			e.printStackTrace();
		} 
	}

	private static void exit() {
		if (in != null) {
			try {
				in.close();
			} catch (IOException e) {}
		}
		System.exit(0);
	}

}
