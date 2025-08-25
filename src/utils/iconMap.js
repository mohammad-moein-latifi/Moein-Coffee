import Curve from '@/components/modules/icons/Curve';
import AppLogo from '@/components/modules/icons/AppLogo';
import Support from '@/components/modules/icons/Support';
import Delivery from '@/components/modules/icons/Delivery';
import LogoType from '@/components/modules/icons/LogoType';
import CoffeeMug from '@/components/modules/icons/CoffeeMug';
import FooterCurve from '@/components/modules/icons/FooterCurve';
import EspressoMaker from '@/components/modules/icons/EspressoMaker';

import { VscSignIn } from 'react-icons/vsc';
import { HiMiniXMark } from 'react-icons/hi2';
import { HiOutlineMenu } from 'react-icons/hi';
import {
  IoBagHandleOutline,
  IoBookOutline,
  IoCallOutline,
  IoChatbubblesOutline,
  IoHomeOutline,
  IoNewspaperOutline,
  IoCartOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from 'react-icons/io5';

export const ICONS = {
  // custom
  curve: Curve,
  appLogo: AppLogo,
  support: Support,
  delivery: Delivery,
  logoType: LogoType,
  coffeeMug: CoffeeMug,
  footerCurve: FooterCurve,
  espressoMaker: EspressoMaker,

  // react-icons
  home: IoHomeOutline,
  shop: IoBagHandleOutline,
  dictionary: IoBookOutline,
  blog: IoNewspaperOutline,
  about: IoChatbubblesOutline,
  call: IoCallOutline,
  menu: HiOutlineMenu,
  cart: IoCartOutline,
  closeBtn: HiMiniXMark,
  auth: VscSignIn,
  sunBtn: IoSunnyOutline,
  moonBtn: IoMoonOutline,
};

// fallback icon
export const DefaultIcon = AppLogo;
