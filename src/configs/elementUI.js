import "element-ui/lib/theme-chalk/select.css";
import { Select } from "element-ui";

import "element-ui/lib/theme-chalk/option.css";
import { Option } from "element-ui";

import "element-ui/lib/theme-chalk/input-number.css";
import { InputNumber } from "element-ui";

import "element-ui/lib/theme-chalk/steps.css";
import { Steps } from "element-ui";

import "element-ui/lib/theme-chalk/step.css";
import { Step } from "element-ui";

import "element-ui/lib/theme-chalk/button.css";
import { Button } from "element-ui";

import "element-ui/lib/theme-chalk/loading.css";
import { Loading } from "element-ui";

import "element-ui/lib/theme-chalk/checkbox.css";
import { Checkbox } from "element-ui";

import "element-ui/lib/theme-chalk/tooltip.css";
import { Tooltip } from "element-ui";

import "element-ui/lib/theme-chalk/switch.css";
import { Switch } from "element-ui";

// Setups
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";

import "element-ui/lib/theme-chalk/icon.css";

import ElIcons from "element-ui/lib/theme-chalk/fonts/element-icons.woff";
export const ElementIcons = ElIcons;

locale.use(lang);
export const components = [
  Select,
  Option,
  InputNumber,
  Steps,
  Step,
  Button,
  Loading,
  Tooltip,
  Checkbox,
  Switch
];
