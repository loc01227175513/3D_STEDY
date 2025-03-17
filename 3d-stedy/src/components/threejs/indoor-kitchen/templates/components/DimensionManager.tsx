import { IndoorDimension } from '../../IndoorDimension';
import * as THREE from 'three';
import { useKitchenStore } from '@/store/useKitchenStore';
import { useEffect, useState } from 'react';
import { emitter, THREE_EVENTS } from '@/utils/events';

// Props cho DimensionManager component
interface DimensionManagerProps {
  showDimension: boolean; // Hiển thị kích thước
  kitchenBound: any; // Ranh giới của nhà bếp
  kitchenScene: THREE.Group | THREE.Object3D; // Scene 3D của nhà bếp
}

export const DimensionManager = ({
  showDimension,
  kitchenBound,
  kitchenScene,
}: DimensionManagerProps) => {
  const [checkislandshot, setcheckislandshot] = useState(false);
  // Lấy trạng thái vô hiệu hóa của các thành phần từ store
  const {
    isGalleyislandDisabled, // Đảo bếp
    isKitchenDisabled, // Tủ bếp
    isBackwallDisabled, // Tường sau
    kitchenWidth,
    fridgeCabinetWidth,
    tallCabinetWidth,
    kitchenCabinetWidth,
  } = useKitchenStore();

  // Xử lý sự kiện chụp ảnh đảo bếp đơn lẻ
  useEffect(() => {
    const handleScreenShotIndoorIslandSingle = () => {
      if (isGalleyislandDisabled) {
        setcheckislandshot(true);
      }
    };

    emitter.on(
      THREE_EVENTS.screenShotIndoorIslandSingle,
      handleScreenShotIndoorIslandSingle
    );

    return () => {
      emitter.off(
        THREE_EVENTS.screenShotIndoorIslandSingle,
        handleScreenShotIndoorIslandSingle
      );
    };
  }, [isGalleyislandDisabled]);

  // Không hiển thị nếu thiếu các điều kiện cần thiết
  if (!showDimension || !kitchenBound || !kitchenScene) {
    return null;
  }
  const isLargeKitchen = kitchenWidth >= 4000;
  const width = kitchenWidth / 1000;
  const fridgeCabinetWidthWidth = fridgeCabinetWidth;
  const tallCabinetWidthWidth = tallCabinetWidth / 1000;
  const kitchenCabinetWidthWidth = kitchenCabinetWidth / 1000;
  // Calculate xMin and xMax based on kitchenWidth
  const calculateBounds = (width: number) => {
    const halfWidth = width / 2000; // Convert to meters and get half
    return {
      standard: {
        xMin: 
        (fridgeCabinetWidthWidth ===1200)
        ? -halfWidth * 1.85 
        : (fridgeCabinetWidthWidth <800) ?-halfWidth * 1.5 
        : ( 800 <fridgeCabinetWidthWidth) ? 
         (fridgeCabinetWidthWidth <1200) ?-halfWidth * 1.55 : -halfWidth * 1.3 
         : -halfWidth * 1.5, // Add 10% margin
        xMax: (fridgeCabinetWidthWidth ===1200)
        ? halfWidth * 2 
        : ( 800<fridgeCabinetWidthWidth ) ? halfWidth * 1.85  :  (fridgeCabinetWidthWidth <1200) ? halfWidth * 1.7 : halfWidth * 1.6,  // Add 15% margin
      },
      large: {
        xMin: -halfWidth * 1.1, // Add 15% margin for large kitchens
        xMax: halfWidth * 1.1     // Add 20% margin for large kitchens
      }
    };
  };

  const bounds = calculateBounds(kitchenWidth);

  return (
    <>
      {/* ============= TRƯỜNG HỢP 1: CHỈ BẬT MỘT THÀNH PHẦN ============= */}
      {/* 1.1. Chỉ bật tủ bếp */}
      {isKitchenDisabled &&
        !isBackwallDisabled &&
        !isGalleyislandDisabled &&
        !isLargeKitchen && (
          <IndoorDimension
            bound={{
              xMin: bounds.standard.xMin ,
              xMax: bounds.standard.xMax,
              yMin: -0.2,
              yMax: 3.6,
              zMin: -0.6,
              zMax: 0.6,
            }}
            size={new THREE.Vector3(kitchenWidth, 2380, 600)}
            color="red"
          />
        )}

      {/* 1.2. Chỉ bật tường sau - Bếp thường */}
      {isBackwallDisabled &&
        !isKitchenDisabled &&
        !isGalleyislandDisabled &&
        !isLargeKitchen && (
          <IndoorDimension
            bound={{
              xMin: bounds.standard.xMin * 1.1,
              xMax: bounds.standard.xMax * 1.1,
              yMin: -0.2,
              yMax: 4.1,
              zMin: -0.6,
              zMax: 0.6,
            }}
            size={new THREE.Vector3(kitchenWidth, 2380, 900)}
            color="red"
          />
        )}

      {/* 1.3. Chỉ bật tường sau - Bếp lớn */}
      {isBackwallDisabled &&
        !isKitchenDisabled &&
        !isGalleyislandDisabled &&
        isLargeKitchen && (
          <IndoorDimension
            bound={{
              xMin: bounds.large.xMin * 1.1,
              xMax: bounds.large.xMax * 1.1,
              yMin: -0.2,
              yMax: 4.1,
              zMin: -0.6,
              zMax: 0.6,
            }}
            size={new THREE.Vector3(kitchenWidth, 2600, 900)}
            color="red"
          />
        )}

      {/* 1.4. Chỉ bật tủ bếp - Bếp lớn */}
      {!isBackwallDisabled &&
        isKitchenDisabled &&
        !isGalleyislandDisabled &&
        isLargeKitchen && (
          <IndoorDimension
            bound={{
              xMin: bounds.standard.xMin,
              xMax: bounds.standard.xMax,
              yMin: -0.2,
              yMax: 3.57,
              zMin: -0.6,
              zMax: 0.6,
            }}
            size={new THREE.Vector3(kitchenWidth, 2380, 600)}
            color="red"
          />
        )}

      {/* 1.5. Chỉ bật đảo bếp */}
      {isGalleyislandDisabled && !isBackwallDisabled && !isKitchenDisabled && (
        <IndoorDimension
          bound={{
            xMin: -2.2,
            xMax: 2.2,
            yMin: 0,
            yMax: 1.4,
            zMin: 3.5,
            zMax: 1.9,
          }}
          size={new THREE.Vector3(3000, 920, 900)}
          color="red"
        />
      )}

      {/* ============= TRƯỜNG HỢP 2: BẬT HAI THÀNH PHẦN ============= */}
      {/* 2.1. Bật đảo bếp và tủ bếp - Bếp thường */}
      {isGalleyislandDisabled &&
        !isBackwallDisabled &&
        isKitchenDisabled &&
        !isLargeKitchen && (
          <>
            <IndoorDimension
              bound={{
                xMin: -2.1,
                xMax: 2.3,
                yMin: 0,
                yMax: 1.4,
                zMin: 2.1 ,
                zMax: 3.5,
              }}
              size={new THREE.Vector3(3000, 920, 900)}
              color="red"
            />
            <IndoorDimension
              bound={{
                xMin: bounds.standard.xMin,
                xMax: bounds.standard.xMax-0.1,
                yMin: -0.2,
                yMax: 3.58,
                zMin: -0.45  ,
                zMax: 0.6,
              }}
              size={new THREE.Vector3(kitchenWidth, 2380, 900)}
              color="red"
            />
          </>
        )}

      {/* 2.2. Bật đảo bếp và tủ bếp - Bếp lớn */}
      {isGalleyislandDisabled &&
        !isBackwallDisabled &&
        isKitchenDisabled &&
        isLargeKitchen && (
          <>
            <IndoorDimension
              bound={{
                xMin: -2.1,
                xMax: 2.3,
                yMin: 0,
                yMax: 1.4,
                zMin: 2,
                zMax: 3.5,
              }}
              size={new THREE.Vector3(3000, 920, 900)}
              color="red"
            />
            <IndoorDimension
              bound={{
                xMin: bounds.standard.xMin,
                xMax: bounds.standard.xMax-0.1,
                yMin: -0.2,
                yMax: 3.58,
                zMin: -0.4,
                zMax: 0.6,
              }}
              size={new THREE.Vector3(kitchenWidth, 2380, 900)}
              color="red"
            />
          </>
        )}

      {/* 2.3. Bật đảo bếp và tường sau - Bếp thường */}
      {isGalleyislandDisabled &&
        isBackwallDisabled &&
        !isKitchenDisabled &&
        !isLargeKitchen && (
          <>
            <IndoorDimension
              bound={{
                xMin: -2.2,
                xMax: 2.3,
                yMin: 0,
                yMax: 1.4,
                zMin: 2,
                zMax: 3.5,
              }}
              size={new THREE.Vector3(3000, 920, 900)}
              color="red"
            />
            <IndoorDimension  
              bound={{
                xMin: bounds.standard.xMin,
                xMax: bounds.standard.xMax,
                yMin: -0.2,
                yMax: 4.1,
                zMin: -0.6,
                zMax: 0.6,
              }}
              size={new THREE.Vector3(kitchenWidth, 2600, 900)}
              color="red"
            />
          </>
        )}

      {/* 2.4. Bật đảo bếp và tường sau - Bếp lớn */}
      {isGalleyislandDisabled &&
        isBackwallDisabled &&
        !isKitchenDisabled &&
        isLargeKitchen && (
          <>
            <IndoorDimension
              bound={{
                xMin: -2.1,
                xMax: 2.3,
                yMin: 0,
                yMax: 1.4,
                zMin: 2,
                zMax: 3.5,
              }}
              size={new THREE.Vector3(3000, 920, 900)}
              color="red"
            />
            <IndoorDimension
              bound={{
                xMin: bounds.standard.xMin,
                xMax: bounds.standard.xMax,
                yMin: -0.2,
                yMax: 4.1,
                zMin: -0.6,               
                 zMax: 0.6,
              }}
              size={new THREE.Vector3(kitchenWidth, 2600, 900)}
              color="red"
            />
          </>
        )}

      {/* 2.5. Bật tường sau và tủ bếp - Bếp thường */}
      {!isGalleyislandDisabled &&
        isBackwallDisabled &&
        isKitchenDisabled &&
        !isLargeKitchen && (
          <IndoorDimension
            bound={{
              xMin: bounds.standard.xMin,
              xMax: bounds.standard.xMax,
              yMin: -0.2,
              yMax: 3.59,
              zMin: -0.3,
              zMax: 0.6,
            }}
            size={new THREE.Vector3(kitchenWidth, 2380, 600)}
            color="red"
          />
        )}

      {/* 2.6. Bật tường sau và tủ bếp - Bếp lớn */}
      {!isGalleyislandDisabled &&
        isBackwallDisabled &&
        isKitchenDisabled &&
        isLargeKitchen && (
          <IndoorDimension
            bound={{
              xMin: bounds.standard.xMin,
              xMax: bounds.standard.xMax,
              yMin: -0.2,
              yMax: 3.59 ,
              zMin: -0.3,
              zMax: 0.6,
            }}
            size={new THREE.Vector3(kitchenWidth, 2380, 600)}
            color="red"
          />
        )}

      {/* ============= TRƯỜNG HỢP 3: BẬT TẤT CẢ THÀNH PHẦN ============= */}
      {/* 3.1. Bật tất cả - Bếp thường */}
      {isGalleyislandDisabled &&
        isBackwallDisabled &&
        isKitchenDisabled &&
        !isLargeKitchen && (
          <>
            <IndoorDimension
              bound={{
                xMin: -2.1,
                xMax: 2.2,
                yMin: 0,
                yMax: 1.4,
                zMin: 2,
                zMax: 3.5,
              }}
              size={new THREE.Vector3(3000, 920, 900)}
              color="red"
            />
            <IndoorDimension
              bound={{
                xMin: bounds.standard.xMin,
                xMax: bounds.standard.xMax,
                yMin: -0.2,
                yMax: 3.59,
                zMin: -0.3,
                zMax: 0.6,
              }}
              size={new THREE.Vector3(kitchenWidth, 2380, 600)}
              color="red"
            />
          </>
        )}

      {/* 3.2. Bật tất cả - Bếp lớn */}
      {isGalleyislandDisabled &&
        isBackwallDisabled &&
        isKitchenDisabled &&
        isLargeKitchen && (
          <>
            <IndoorDimension
              bound={{
                xMin: -2.15 ,
                xMax: 2.2,
                yMin: 0,
                yMax: 1.4,
                zMin: 2,
                zMax: 3.5,
              }}
              size={new THREE.Vector3(3000, 920, 900)}
              color="red"
            />
            <IndoorDimension
              bound={{
                xMin: bounds.standard.xMin,
                xMax: bounds.standard.xMax,
                yMin: -0.2,
                yMax: 3.59 ,
                zMin: -0.3,
                zMax: 0.6,
              }}
              size={new THREE.Vector3(kitchenWidth, 2380, 600)}
              color="red"
            />
          </>
        )}
    </>
  );
};
