/**
 * svg 图片组件
 * @export
 * @class SvgIcon
 * @extends {PureComponent}
 */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import SvgUri from './SvgUri';
import svgXmlData from './svgXmlData';

export default class SvgIcon extends PureComponent {
    static propTypes = {
        style: PropTypes.object,
        /* eslint-disable react/require-default-props */
        color: PropTypes.object,
        size: PropTypes.shape(
            {
                width: PropTypes.number.isRequired,
                height: PropTypes.number.isRequired,
            }
        ).isRequired,
        icon: PropTypes.string.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const {
            size,
            color,
            style,
            icon,
        } = this.props;
        const svgXmlPath = svgXmlData[icon];
        // eslint-disable-next-line no-nested-ternary
        return svgXmlData
            ? color ? (
                <SvgUri
                    fill={color}
                    style={style}
                    width={size.width}
                    height={size.height}
                    svgXmlData={svgXmlPath}
                />
            ) : (
                <SvgUri
                    style={style}
                    width={size.width}
                    height={size.height}
                    svgXmlData={svgXmlPath}
                />
            ) : <View />;
    }
}
