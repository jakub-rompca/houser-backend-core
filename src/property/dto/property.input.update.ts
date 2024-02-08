import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePropertyInput } from './property.input.create';

@InputType()
export class UpdatePropertyInput extends PartialType(CreatePropertyInput) {}
