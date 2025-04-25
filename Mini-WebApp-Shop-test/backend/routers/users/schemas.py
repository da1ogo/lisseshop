from datetime import datetime

from core.schemas import BaseSchema, PaginationSchema
from pydantic import field_validator


class UserSchema(BaseSchema):
    id: int
    telegram_id: int
    username: str
    phone: str
    sale: float
    address: str

    created_at: datetime
    updated_at: datetime | None
    deleted_at: datetime | None

    @field_validator("created_at", "updated_at", "deleted_at")
    @classmethod
    def convert_datetime_to_str(cls, v: datetime | None) -> str | None:
        if v is not None:
            return v.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        return v


class CreateUserSchema(BaseSchema):
    telegram_id: int | None = None
    username: str | None = None
    phone: str | None = None
    sale: float | None = None
    address: str | None = None


class UpdateUserSchema(BaseSchema):
    username: str | None = None
    phone: str | None = None
    sale: float | None = None
    address: str | None = None


class DeleteUserSchema(BaseSchema):
    id: int
    telegram_id: int


class UsersListSchema(BaseSchema):
    total: int
    items: list[UserSchema]


class UsersPaginationSchema(PaginationSchema):
    pass


class UsersSearchSchema(BaseSchema):
    id: int | None
    telegram_id: int | None
    username: str | None
    phone: str | None
    created_at: datetime | None
    updated_at: datetime | None
    deleted_at: datetime | None
