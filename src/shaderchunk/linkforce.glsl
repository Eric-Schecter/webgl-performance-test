const float distance=30.;

struct NodeParams{
  vec4 p;
  vec4 v;
};

float getLength(vec3 vf,vec4 link){
  float len=length(vf);
  return len<1.?0.:(len-distance)/len*link.w;
}

NodeParams getNodePos(float id,vec2 map,float length,sampler2D texturePosition,sampler2D textureVelocity){
  float r=mod(id,length);
  float c=floor(id/length);
  vec2 ref=vec2(r+.5,c+.5)/map;
  vec4 p=texture(texturePosition,ref);
  vec4 v=texture(textureVelocity,ref);
  return NodeParams(p,v);
}

vec4 forceByTargetNode(vec4 v,vec4 p,vec4 link,NodeParams params){
  float x=params.p.x+params.v.x-p.x-v.x;
  float y=params.p.y+params.v.y-p.y-v.y;
  float z=params.p.z+params.v.z-p.z-v.z;
  vec3 vf=vec3(x,y,z);
  float len=getLength(vf,link);
  
  v.x+=x*len*(1.-link.z);
  v.y+=y*len*(1.-link.z);
  v.z+=z*len*(1.-link.z);
  return v;
}

vec4 forceBySourceNode(vec4 v,vec4 p,vec4 link,NodeParams params){
  float x=p.x+v.x-params.p.x-params.v.x;
  float y=p.y+v.y-params.p.y-params.v.y;
  float z=p.z+v.z-params.p.z-params.v.z;
  vec3 vf=vec3(x,y,z);
  float len=getLength(vf,link);
  
  v.x-=x*len*link.z;
  v.y-=y*len*link.z;
  v.z-=z*len*link.z;
  return v;
}

vec4 linkForce(vec4 v,vec4 p,float nodeID,float linkWidth,float nodeWidth,sampler2D textureLinks){
  vec2 data=vec2(linkWidth);
  vec2 map=vec2(nodeWidth);
  for(float r=0.;r<linkWidth;r++){
    for(float c=0.;c<linkWidth;c++){
      vec2 ref=vec2(r+.5,c+.5)/data;
      vec4 link=texture(textureLinks,ref);
      float sourceID=link.x;
      float targetID=link.y;
      if(nodeID==sourceID){
        NodeParams targetNode=getNodePos(targetID,map,nodeWidth,texturePosition,textureVelocity);
        v=forceByTargetNode(v,p,link,targetNode);
      }
      if(nodeID==targetID){
        NodeParams sourceNode=getNodePos(sourceID,map,nodeWidth,texturePosition,textureVelocity);
        v=forceBySourceNode(v,p,link,sourceNode);
      }
    }
  }
  return v;
}