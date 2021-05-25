uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;
uniform sampler2D textureLinks;
in vec2 reference;
out float isValid;

void main(){
  vec4 p=texture(texturePosition,reference);
  vec4 v=texture(textureVelocity,reference);
  isValid = v.w;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p.xyz,1.);
}