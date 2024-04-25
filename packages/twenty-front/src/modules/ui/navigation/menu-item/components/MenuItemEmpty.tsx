import { StyledMenuItemEmpty } from '@/ui/navigation/menu-item/internals/components/StyledMenuItemBase';

export type MenuItemEmptyProps = {
  text: string;
};

export const MenuItemEmpty = ({ text }: MenuItemEmptyProps) => {
  return <StyledMenuItemEmpty>{text}</StyledMenuItemEmpty>;
};
