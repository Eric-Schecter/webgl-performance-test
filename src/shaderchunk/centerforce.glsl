vec4 centerForce(vec4 v,vec4 p,float nodeWidth,float nodeCount,vec3 center){
  vec2 map=vec2(nodeWidth);
  vec3 s = vec3(0.);
  for(float r=0.5;r<nodeWidth;r++){
    for(float c=0.5;c<nodeWidth;c++){
      vec2 ref=vec2(r,c)/map;
      vec4 node=texture(texturePosition,ref);
      s += node.xyz;
    }
  }
  v.xyz-=s/nodeCount-center;
  return v;
}