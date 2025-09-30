import React, { useRef, Suspense } from 'react';
import portfolio from '../data/Portfolio'
import PortfolioItem from './PortfolioItem';
import Title from './Title'
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, useAnimations } from '@react-three/drei';


function Model({ url }) {
    const modelRef = useRef();
    const { scene, animations } = useGLTF(url);
    const { actions } = useAnimations(animations, modelRef);

    React.useEffect(() => {
        if (actions && Object.keys(actions).length > 0) {
            const firstActionKey = Object.keys(actions)[0];
            actions[firstActionKey].play();
        }
    }, [actions]);

    useFrame(() => {
        if (modelRef.current) {
            // rotate y dir for dynamic
            //   modelRef.current.rotation.y += 0.005;
            modelRef.current.position.x += Math.sin(Date.now() * 0.001) * -0.005;
            //   modelRef.current.rotation.y = 0; // debug front
        }
    });

    return <primitive ref={modelRef} object={scene} scale={1} />;
}



// fallback loading
function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[10, 10, 10]} />
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


function Portfolio() {
    return (
        <div className='flex flex-col md:flex-row justify-center pl-10 md:pl-0 my-5'>
            <div className='w-full md:w-10/12 md:pl-5'>
                <Title>Projects</Title>

                <ModelErrorBoundary>
                    <div className="w-64 h-64 md:w-full md:h-96 mx-auto mb-8 rounded-lg overflow-hidden">
                        <Canvas camera={{ position: [5,5,15], fov: 50 }}>  {/* fov based on my normal tf2*/}
                            <Suspense fallback={<LoadingFallback />}>
                                <Stage environment="city" intensity={0.6}>
                                    <Model url="/assets/sweeper.glb" />
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



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
                {portfolio.map(project => 
                    <PortfolioItem 
                        imgUrl={project.imgUrl}
                        title={project.title}
                        stack={project.stack}
                        link={project.link}
                    />
                )}
                </div>
            </div>
        </div>
    )
}

export default Portfolio;