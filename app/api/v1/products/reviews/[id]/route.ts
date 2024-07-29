import { validateFieldMaxMin, validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import ProductReview from "@/src/models/productReview.models";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    try {
        validateOBJID(id, "Review Id")

        await connectDatabase();

        const findReview = await ProductReview.findById(id);

        if (!findReview) {
            return NextResponse.json({ error: "Review are not found." }, { status: 401 });
        }

        return NextResponse.json({ result: findReview }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const { content, user, reviewId } = await req.json();
    const id = params.id;

    try {
        validateOBJID(reviewId, "Review Id");
        validateOBJID(user?.id, "User Id");
        validateFieldMaxMin(content,"Review Content", 5,300);

        await connectDatabase();

        const findReview = await ProductReview.findById(id);
        const findUser = await User.findById(user?.id);

        if (!findReview) {
            return NextResponse.json({ error: "Review are not found." }, { status: 401 });
        }

        if(!findUser){
            return NextResponse.json({error: "User are not found."}, { status: 401 });
        }

        if(user.id !== findReview?.user?.id && findUser.role !== 'admin'){
            return NextResponse.json({error: "You are not able to Update this Review"})
        }

        
        const updateReview = await ProductReview.findByIdAndUpdate(reviewId,{
            $set: {
                content: content
            }
        },
        {
            new: true
        })

        if(!updateReview){
            return NextResponse.json({error: "Unable update review"},{status: 402});
        }

        return NextResponse.json({ result: updateReview?.content }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}


export async function DELETE(req: NextRequest,{params}: { params: { id: string } }){
    const id = params.id;
    const {  user, reviewId } = await req.json();
    try {
        validateOBJID(id, "Review Id")

        await connectDatabase();

        const findReview = await ProductReview.findById(id);
        const findUser = await User.findById(user?.id);

        if (!findReview) {
            return NextResponse.json({ error: "Review are not found." }, { status: 401 });
        }

        if(!findUser){
            return NextResponse.json({error: "User are not found."}, { status: 401 });
        }

        if(user.id !== findReview?.user?.id && findUser.role !== 'admin'){
            return NextResponse.json({error: "You are not able to Update this Review"})
        }

        const deleteReview = await ProductReview.findByIdAndDelete(reviewId);

        if(!deleteReview){
            return NextResponse.json({error: "Something went wrong, can't delete"}, {status: 401});
        }

        return NextResponse.json({ result: "success", message: "Review Delete Successfull" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}