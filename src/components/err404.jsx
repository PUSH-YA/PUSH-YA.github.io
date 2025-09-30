import React, { useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
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



const Error404 = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-stone-900 dark:text-stone-100 mb-4">404 :(</h1>
                <h2 className="text-4xl font-semibold text-stone-500 mb-8">Page Not Found</h2>
                <p className="text-xl text-stone-500 mb-8">
                    The page you're looking for doesn't exist.
                    <br />
                    Enjoy the following visualisation though:
                </p>

                <ModelErrorBoundary>
                    <div className="w-64 h-64 md:w-96 md:h-96 mx-auto mb-8 rounded-lg overflow-hidden">
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

                {/* add a small game to play here */}

                <Link
                    to="/"
                    className="bg-violet-400 dark:bg-blue-500 hover:bg-blue-600 text-white font-bold mt-10 py-3 px-6 rounded-lg transition duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Error404;