<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
  
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'user_id'=>$this->user_id,
            'type'=>$this->type,
            'source'=>$this->source,
            'amount'=>$this->amount,
            'date'=>$this->date,
            'created_at'=>$this->created_at,
            
        ];
    }
}
