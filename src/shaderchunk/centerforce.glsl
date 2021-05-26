vec4 centerForce(vec4 v,vec4 p,float nodeWidth,float nodeCount,vec3 center){
  vec2 map=vec2(nodeWidth);
  vec3 s=vec3(0.);
  bool isValid = true;
  for(float r=0.;r<nodeWidth;r++){
    for(float c=0.;c<nodeWidth;c++){
      if(r * nodeWidth + c >= nodeCount){
        isValid = false;
        break;
      }
      vec2 ref=vec2(r+.5,c+.5)/map;
      vec4 node=texture(texturePosition,ref);
      s+=node.xyz;
    }
    if(!isValid){
      break;
    }
  }
  v.xyz-=s/nodeCount-center;
  return v;
}