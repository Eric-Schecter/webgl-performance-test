vec4 centerForce(vec4 v,vec4 p,float nodeWidth,float nodeCount,vec3 center){
  vec2 map=vec2(nodeWidth);
  float sx=0.;
  float sy=0.;
  float sz=0.;
  for(float r=0.;r<nodeWidth;r++){
    for(float c=0.;c<nodeWidth;c++){
      vec2 ref=vec2(r+.5,c+.5)/map;
      vec4 node=texture(texturePosition,ref);
      sx+=node.x;
      sy+=node.y;
      sz+=node.z;
    }
  }
  v.x-=sx/nodeCount-center.x;
  v.y-=sy/nodeCount-center.y;
  v.z-=sz/nodeCount-center.z;
  return v;
}