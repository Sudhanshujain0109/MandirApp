import React from 'react';
import { SvgXml, SvgXmlProps } from 'react-native-svg';

interface SvgIconProps extends SvgXmlProps {
  svgXmlData:string,
  size?: number;
  color?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ svgXmlData, size,color,...rest }) => {
  const svgData = svgXmlData.replace(/[\r\n]/g, '');

  const svgProps: SvgXmlProps = {
    xml: svgData,
    width: size,
    height: size,
    fillColor: color,
    ...rest,
  };

  return <SvgXml {...svgProps} />;
};

export default SvgIcon;