export interface Billboard {
    updateAt:          Date;
    currency:          string;
    id:                number;
    slug:              string;
    title:             string;
    description:       string;
    height:            number;
    width:             number;
    price:             number;
    rate:              string;
    type:              string;
    status:            string;
    thumbnailId:       number | null;
    images:            Image[];
    billboardLocation: BillboardLocation;
    owner:             Owner;
}

export interface BillboardLocation {
    address: string;
    lat:     number;
    lng:     number;
}

export interface Image {
    id:               number;
    createdAt:        Date;
    updateAt:         Date;
    name:             string;
    extension:        string;
    url:              string;
    mime:             string;
    size:             number;
    width:            number;
    height:           number;
    provider:         string;
    providerMetadata: ProviderMetadata;
    billboardId:      number;
}

export interface ProviderMetadata {
    publicId:     string;
    resourceType: string;
}

export interface Owner {
    firstName: string;
    lastName:  string;
    username: string;
    profileImage: string | null
}