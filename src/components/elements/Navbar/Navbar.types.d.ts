export type NavbarProps = {
    editable?: boolean;
	boardId?: number;
	title?: any;
	members?: number[];
	onTitleSave?: (title: string) => void;
}