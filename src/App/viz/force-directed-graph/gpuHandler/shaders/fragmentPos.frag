uniform vec4 pickedNode;
uniform sampler2D textureNodes;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 p=texture(texturePosition,uv);
  vec4 v=texture(textureVelocity,uv);
  vec4 node=texture(textureNodes,uv);
  if(pickedNode.w==node.w){
    p.xyz=pickedNode.xyz;
  }else{
    p.xyz+=v.xyz;
  }
  gl_FragColor=vec4(p);
}