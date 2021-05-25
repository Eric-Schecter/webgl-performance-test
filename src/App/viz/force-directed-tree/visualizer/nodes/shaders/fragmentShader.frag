in vec3 vColor;
in float isValid;

void main(){
	float distance=length(2.*gl_PointCoord-1.);
	if(distance>1. || isValid==-1.){
		discard;
	}
	gl_FragColor=vec4(vColor,1.);
}