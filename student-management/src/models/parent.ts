
export class Parent {
    fatherName: string;
    fatherNIC: string;
    fatherNo: string;
    motherName: string;
    motherNIC: string;
    motherNo: string;
    constructor(
        fatherName?: string,
        fatherNIC?: string,
        fatherNo?: string,
        motherName?: string,
        motherNIC?: string,
        motherNo?: string
      ) {
        this.fatherName = fatherName || "";
        this.fatherNIC = fatherNIC || "";
        this.fatherNo = fatherNo || "";
        this.motherName = motherName || "";
        this.motherNIC = motherNIC || "";
        this.motherNo = motherNo || "";
      }
}