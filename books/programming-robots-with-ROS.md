# Programming Robots with ROS

## Actuation: Mobile Pltforms

- non-holonomic
    - differential drive
        - statically stable
        - dynamically stable
    - skid steering
    - ackerman platforms
        - elaborate planning and sequential actuator maneuvers are required to move an Ackerman platform sideways
- holonomic
    - Mecanum

## Actuation: Manipulator Arm

- pin joints
- prismatic joints
- degrees of freedom (DOF)
- joints
    - distal
    - proximal

## Sensors

- types
    - binary
        - mechanical limit switch
        - optical limit switche
        - bump sensors
    - scalar
        - mechanical or barometric pressure
        - range sensors

- sensor head
    - atop pan/tilt assembly
    - preserve line-of-sight with center of the workspace

- visual cameras
    - canonical message type sensor_msgs/Image
    - sensor_msgs/Image is required to describe intrinsic dostortion of physical camera
    - cv_bridge package used to send message to OpenCV

- depth cameras
    - structured light

        ```
        It’s hard to overstate the impact that the Kinect has had on modern robotics! It was
        designed for the gaming market, which is orders of magnitude larger than the robotics
        sensor market, and could justify massive expenditures for the development and production
        of the sensor. The launch price of $150 was incredibly cheap for a sensor capable of
        outputting so much useful data. Many robots were quickly retrofitted to hold Kinects, and
        the sensor continues to be used across research and industry.
        ```
    - unstructured light
    - time-of-flight
        - fundamental message is sensor_msgs/PointCloud2

- laser scanner
    - sensor_msgs/LaserScan

- shaft encoders
    - odometry estimates are most useful when reported as a spatial transformation represented by a geometry_msgs/Transform
    - encoder readings for manipulator arms are typically broadcast by ROS manipulator device drivers as sensor_msgs/JointState messages

S.L.A.M. - simultaneous localization and mapping

- Simulators
    - Stage
    - Gazebo
