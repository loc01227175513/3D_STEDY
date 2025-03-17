import { Html } from '@react-three/drei';
import { CircularProgress } from '@mui/material';

export const LoadingSpinner = () => {
  return (
    <Html center position={[0, 2, 0]}>
        <CircularProgress size={40} style={{ color: '#EBB91A' }} />
    </Html>
  );
};
