import React from "react";
import { Star } from "lucide-react";

const ReviewsTab = ({ reviews }) => {
    return (
        <div>
            <h3 className="font-semibold text-gray-800 mb-4">Đánh giá</h3>
            <div className="space-y-4">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800 mb-1">
                                        {review.jobTitle}
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-2">{review.date}</p>
                                    <p className="text-sm text-gray-700">{review.comment}</p>
                                </div>
                                <div className="flex items-center gap-1 ml-4">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-medium text-gray-800">
                                        {review.rating.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Chưa có đánh giá nào</p>
                )}
            </div>
        </div>
    );
};

export default ReviewsTab;

