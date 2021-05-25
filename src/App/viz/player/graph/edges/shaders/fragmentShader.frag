in float isValid;
uniform float isDark;

void main(){
	if(isValid==-1.){
		discard;
	}
	vec3 color=vec3(isDark);
	gl_FragColor=vec4(color,.2);
}