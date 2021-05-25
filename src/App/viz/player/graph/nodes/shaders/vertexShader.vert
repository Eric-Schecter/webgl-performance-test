uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;
uniform sampler2D textureNodes;
in vec2 reference;
in vec3 aColor;
out vec3 vColor;
out float isValid;

const float sizeRatio = 8000.;

void main(){
  vec4 p=texture(texturePosition,reference);
  vec4 v=texture(textureVelocity,reference);
  vec4 node=texture(textureNodes,reference);
  vColor=aColor;
  isValid=node.w;
  vec4 mvPosition = modelViewMatrix*vec4(p.xyz,1.);
  gl_PointSize=sizeRatio/length(mvPosition.xyz) * (1. + node.x/5.);
  gl_Position=projectionMatrix*mvPosition;
}