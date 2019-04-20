/**
 * svg图片按钮
 * @export
 * @class SvgButtonIcon
 * @extends {PureComponent}
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import SvgIcon from './SvgIcon';

export default class SvgButtonIcon extends PureComponent {
    static propTypes = {
        style: PropTypes.object,
        onPress: PropTypes.func,
    }

    static defaultProps = {
        style: {},
        onPress: () => {},
    }

    render() {
        const {
            style,
            onPress,
        } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={[styles.container, style]}
            >
                <SvgIcon {...this.props} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
