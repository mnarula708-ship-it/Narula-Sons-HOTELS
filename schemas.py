from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="John Doe")
    email: EmailStr = Field(..., example="john@example.com")
    phone: Optional[str] = Field(None, max_length=20, example="+91 9876543210")
    subject: str = Field(..., example="partnership")
    message: str = Field(..., min_length=5, max_length=2000, example="I would like to discuss strategic investment opportunities.")

class ContactInquiryResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    subject: str
    message: str
    created_at: str
    status: str = "received"

class StatItem(BaseModel):
    number: str
    label: str
    raw_value: int

class FinancialMetric(BaseModel):
    id: str
    title: str
    target: str
    number: int
    prefix: str = ""
    suffix: str = ""
    bar_width: int
    icon: str

class InfrastructureItem(BaseModel):
    id: str
    icon: str
    title: str
    description: str
    counter: Optional[int] = None
    suffix: Optional[str] = None
    tag: Optional[str] = None

class PresentationSlide(BaseModel):
    id: int
    title: str
    description: str
    image_url: str
    highlights: List[str]

class GalleryItem(BaseModel):
    id: str
    title: str
    subtitle: str
    image_url: str
    category: str = "luxury"

class PartnerCountry(BaseModel):
    code: str
    name: str
    flag: str
    is_hq: bool = False
    cx: int
    cy: int
