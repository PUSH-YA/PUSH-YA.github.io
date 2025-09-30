import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, useAnimations } from '@react-three/drei';

function Model({ url }) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, modelRef);
  
  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstActionKey = Object.keys(actions)[0];
      const action = actions[firstActionKey];
      // action.timeScale = 0.1; // slow animation
      action.play();
    }
  }, [actions]);
  useFrame(() => {
    if (modelRef.current) {
      // rotate y dir for dynamic
      // modelRef.current.rotation.y += 0.001;
      modelRef.current.rotation.y = 0; // debug front
    }
  });
  
  return <primitive ref={modelRef} object={scene} scale={0.5} />;
}

// fallback loading
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color="#1c1917" />
    </mesh>
  );
}

// error boundary for 3D model loading
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    // in case this does not work
    if (this.state.hasError) {
      return (
        // don't show anything
        <div></div>
      );
    }

    return this.props.children;
  }
}

function Intro() {
  return (
    <div className="flex items-center justify-center flex-col text-center pt-20 pb-6">
      
    
        <div className="flex flex-row justify-center items-center mt-0  ">

          {/* name and title */}
          <div>
              <h1 className="text-3xl md:text-5xl mb-1 md:mb-3 font-bold">
                Pushya Jain
              </h1>
              <p className="text-base md:text-xl mb-3 font-medium">
                ML Researcher & Data Scientist
              </p>
            
          </div>

          {/* robot */}
                 <ModelErrorBoundary>
                <div className="sm:w-4 sm:h-4 md:w-80 md:h-100 sm:mb-1 rounded-lg overflow-hidden">
                  <Canvas camera={{ position: [0,0,5], fov: 60 }}>  {/* fov based on my normal tf2*/}
                    <Suspense fallback={<LoadingFallback />}>
                      <Stage environment="city" intensity={1}>
                        <Model url="/assets/robot_playground.glb" />
                      </Stage>
                      <OrbitControls 
                        enableZoom={true} 
                        enablePan={false}
                        maxPolarAngle={Math.PI / 2} // 90
                          minPolarAngle={Math.PI / 4} // 45
                      /> 
                  </Suspense>
                  <ambientLight intensity={0.1} />
                  <directionalLight position={[10, 10, 5]} intensity={1.0} />
              </Canvas>
          </div>
        </ModelErrorBoundary>

        </div>
       



      
      <div className="flex-col md:flex md:flex-row flex-center items-center">
        <p className="text-base max-w-xl mb-6 mt-6 mr-10 ml-10 font-medium">
          I am a 4th-year BSc student majoring in computer science and statistics
          with a minor in data science (at UBC). <br /> <br />
          I have lot of passion for developing my analytical and quantitative skills.
          I have provided links to my social media below if you want to contact me. <br /> <br/>
          Here is a cool visualisations for you to keep you entertained, that
          I found during my learning journey (especially in the realm of data science) 😊
        </p>
        <img
          src="/assets/prof_pic.jpg"
          alt="Profile picture"
          className="rounded-lg shadow-md mr-10 ml-10"
          style={{ maxHeight: '300px', height: '200px', width: 'auto' }}
        />
      </div>
    </div>
  );
}

export default Intro;