export class UserDto {
    name: string
    uf: string
    city: string
    document: number
    document_type: string
    cultivation: [{ product_id: number, product_name: string }]
}