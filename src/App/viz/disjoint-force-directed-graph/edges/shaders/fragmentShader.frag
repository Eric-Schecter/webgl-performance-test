in float isValid;

void main(){
	if(isValid==-1.){
		discard;
	}
	vec3 color=vec3(0.);
	gl_FragColor=vec4(color,.2);
}