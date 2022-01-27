interface IDropdownProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement>>;
  options: Option[];
  additionalOnClose? : ()=> void;
}

interface Option {
  id: number;
  label: string;
  action: () => any;
}

export type { IDropdownProps };
export default {};
