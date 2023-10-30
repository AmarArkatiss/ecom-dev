export class MenuObject {
    menuData: MenuData[];
}

export class MenuData {
    parentId: number;
    parentName: string;
    parentImg: any;
    categoryDetails: CategoryDetail[];
    active: false;
}

export class CategoryDetail {
    childName: string;
    childId: number;
    childImg: any;
    childParentId: any;
    childCategoryDetail: ChildCategoryDetail[];
}
export class ChildCategoryDetail {
    subChildName: string;
    subChildId: number;
    subChildImg: any;
}
export class categoryObject {
    categoryData: CategoryData[];
}
export class CategoryData {
    categoryId: number;
    parentName: string;
    childName: string;
    image: any;
    description: string;
}
