

import { SizeType } from "@/helpers/types/types";
import React from "react";
import { toast } from "sonner";

type Props = {
    sizes: SizeType[]
    setSizes: React.Dispatch<React.SetStateAction<SizeType[]>>
}

const AddSizes: React.FC<Props> = ({ sizes, setSizes }) => {

    const initialData = {
        price: 0,
        quantity: 0,
        size: '',
    };

    const [sizeData, setSizeData] = React.useState(initialData);

    function addSize() {
        if (!sizeData.size || !sizeData.price || !sizeData.quantity) {
            toast("Please fill all fields");
            return;
        } else if (sizeData.price < 0 || sizeData.quantity < 0 || sizeData.size == '') {
            toast("Please fill all fields");
            return;
        }
        setSizes([...sizes, sizeData]);
        setSizeData(initialData);
    }

    function remove() {
        setSizes(sizes.slice(0, -1));
    }
    return (
        <>

            <main className="flex gap-2 items-center">

                <div className='flex flex-col gap-2'>
                    <label htmlFor="size">
                        Size
                    </label>

                    <select className='input' name="size" value={sizeData.size} onChange={(e) => setSizeData({ ...sizeData, size: e.target.value })} id="size" >
                        <option value="Small">
                            Small
                        </option>
                        <option value="Medium">
                            Medium
                        </option>
                        <option value="Large">
                            Large
                        </option>
                        <option value="Extra Large">
                            Extra Large
                        </option>

                    </select>
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="price">
                        Price
                    </label>
                    <input className='input' placeholder='Enter price' type="number" name="price" value={sizeData.price} onChange={(e) => setSizeData({ ...sizeData, price: e.target.valueAsNumber })} id="price" />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="quantity">
                        Quantity
                    </label>
                    <input type="number" name="quantity" id="quantity" className='input' placeholder='Enter quantity' value={sizeData.quantity} onChange={(e) => setSizeData({ ...sizeData, quantity: e.target.valueAsNumber })} />

                </div>

                <div className='flex flex-col gap-2 
           '>
                    <button type="button" onClick={addSize} className="btn  mt-3 pt-3">
                        Add
                    </button>
                </div>
            </main>

            {sizes?.map((size, index) => (
                <div key={index} className="flex gap-2">
                    <p>Size: {size?.size}</p>
                    <p>Price: {size?.price}</p>
                    <p>Quantity: {size?.quantity}</p>
                    <button onClick={() => remove()} className="text-xs text-pink-600">Remove</button>
                </div>
            ))}
        </>
    )
}


export default AddSizes;