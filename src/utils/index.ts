import { IMenu } from '@/constants';

export const getVisibleMenu = (menus: IMenu[]) => {
  return menus.filter(menu => menu.show);
};
