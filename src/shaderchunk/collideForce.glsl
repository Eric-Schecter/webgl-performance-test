const float disMax=200.;
const float strength=10.;

#include <random2d.glsl>;

vec4 collideForce(vec4 v,vec4 p,float nodeWidth,vec4 params,sampler2D textureNodes){
  vec2 map=vec2(nodeWidth);
  float group=params.x;
  for(float r=0.;r<nodeWidth;r++){
    for(float c=0.;c<nodeWidth;c++){
      vec2 ref=vec2(r+.5,c+.5)/map;
      vec4 neighbour=texture(texturePosition,ref);
      vec4 neighbourParams=texture(textureNodes,ref);
      float dis=distance(p,neighbour);
      if(dis<disMax&&dis!=0.){
        vec3 direction=normalize(p.xyz-neighbour.xyz);
        float ratio=group==neighbourParams.x?6.:10.;
        float dis2=pow(dis/ratio,2.);
        vec3 force=direction * strength/dis2;
        v.xyz+=force.xyz;
      }
    }
  }
  return v;
}