import { message } from 'antd';

message.config({
    top: 100,
    duration: 2,
    maxCount: 3,
});

export function success(content) {
    return message.success(content);
}

export function error(content) {
    return message.error(content);
}

export function warning(content) {
    return message.warning(content);
}

export function warn(x) {
    return warning(x);
}

export function info(content) {
    return message.warning(content);
}

export function loading(content) {
    return message.loading(content);
}

export default {
    success, error, warning, warn, info, loading
};
