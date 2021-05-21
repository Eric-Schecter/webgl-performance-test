uniform float uTime;
uniform float linkWidth;
uniform float nodeWidth;
uniform float nodeCount;
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

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 p=texture(texturePosition,uv);
  vec4 v=texture(textureVelocity,uv);
  vec4 node=texture(textureNodes,uv);
  float nodeID=node.w;
  v=collideForce(v,p,nodeWidth,node,textureNodes);
  v=linkForce(v,p,nodeID,linkWidth,nodeWidth,textureLinks);
  v=centerForce(v,p,nodeWidth,nodeCount,center);

  v = limitVelocity(v);
  v.xyz*=.1;
  if(length(v.xyz)<0.1){
    v*=0.;
  }
  gl_FragColor=vec4(v);
}