import { ReactElement } from "react";

type Panel = {
  name: String;
  content: ReactElement;
  props: {
    icon: String;
    align: String;
    desc: String;
    hidden: Boolean;
    disabled: Boolean; // 这些属性都是在不同的区域内，进行各自管理的，如对某些进行显隐更改，可以直接修改相应Container中的state，当然这些修改可以提取出方法
  };
  // area: 这个用单独的prop来承载
  // contentProps: 因为是自己实例化的，所以不用这个Props。但是我如何把Ctx传过去？
};
