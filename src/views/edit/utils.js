// 中间预览区
import { componentType } from "@/const/componentType";
import QuickEnter from "../components/md/quick-enter";
import PureImg from "../components/md/pure-img";
import Img from "../components/md/img";
import PureText from "../components/md/pure-text";
import TextNav from "../components/md/text-nav";
import Margin from "../components/md/margin";

// 右侧编辑区
import HeaderNav from "../components/rt/header-nav";
import FooterNav from "../components/rt/footer-nav";
import QuickEnter_rt from "../components/rt/quick-enter";
import PureImg_rt from "../components/rt/pure-img";
import Img_rt from "../components/rt/img";
import PureText_rt from "../components/rt/pure-text";
import TextNav_rt from "../components/rt/text-nav";
import Margin_rt from "../components/rt/margin";

export const mdComponentBaseMap = {
    [componentType.QUICK_ENTER]: QuickEnter,
    [componentType.PURE_IMG]: PureImg,
    [componentType.IMG]: Img,
    [componentType.PURE_TEXT]: PureText,
    [componentType.TEXT_NAV]: TextNav,
    [componentType.MARGIN]: Margin,
}

// 中间预览区的组件映射
export function mapToMdComponents(list = []) {
    return list.map(item => {
        return { options: item, component: mdComponentBaseMap[item.value] };
    });
}

// 右侧编辑区的组件映射
export const rtComponentBaseMap = {
    [componentType.HEADER_NAV]: HeaderNav,
    [componentType.FOOTER_NAV]: FooterNav,
    [componentType.QUICK_ENTER]: QuickEnter_rt,
    [componentType.PURE_IMG]: PureImg_rt,
    [componentType.IMG]: Img_rt,
    [componentType.PURE_TEXT]: PureText_rt,
    [componentType.TEXT_NAV]: TextNav_rt,
    [componentType.MARGIN]: Margin_rt,
}
export function mapToRtComponents(val = componentType.HEADER_NAV) {
    return rtComponentBaseMap[val];
}
