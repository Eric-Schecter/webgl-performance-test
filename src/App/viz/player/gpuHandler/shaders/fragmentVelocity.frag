uniform float uTime;
uniform float linkWidth;
uniform float nodeWidth;
uniform float nodeCount;
uniform float is2d;
uniform sampler2D textureLinks;
uniform sampler2D textureNodes;

const float vMax = 20.;
const vec3 center=vec3(0.);

#include <collideforce.glsl>;
#include <linkforce.glsl>;
#include <centerforce.glsl>;

vec4 limitVelocity(vec4 v){
  if(length(v.xyz)>vMax){
    v = normalize(v) * vMax;
  }
  return v;
}

vec4 zto0(vec4 v,vec4 p){
  v.z -= p.z;
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 p=texture(texturePosition,uv);
  vec4 v=texture(textureVelocity,uv);
  vec4 node=texture(textureNodes,uv);
  float nodeID=node.w;
  if(nodeID==-1.){
    discard;
  }
  v=collideForce(v,p,nodeWidth,node,textureNodes,nodeCount);
  v=linkForce(v,p,nodeID,linkWidth,nodeWidth,textureLinks,nodeCount);
  v=centerForce(v,p,nodeWidth,nodeCount,center);

  if(is2d==1.){
    v = zto0(v,p);
  }

  v = limitVelocity(v);
  v.xyz*=.1;
  gl_FragColor=vec4(v);
}