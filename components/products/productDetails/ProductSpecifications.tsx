const ProductSpecifications = () => {
    return (
        <div className="p-5">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="border-b">
                    <nav className="flex">
                        <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2 border-transparent hover:border-indigo-600 focus:outline-none">
                            Specifications
                        </button>
                        <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2 border-transparent hover:border-indigo-600 focus:outline-none">
                            Details
                        </button>
                        <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2 border-transparent hover:border-indigo-600 focus:outline-none">
                            Q&A
                        </button>
                        <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2 border-transparent hover:border-indigo-600 focus:outline-none">
                            Review
                        </button>
                    </nav>
                </div>
                <div className="p-6">
                    <table className="min-w-full text-left text-sm text-gray-500">
                        <tbody>
                            <tr className="border-b">
                                <th className="py-2 px-6 font-medium text-gray-900">General</th>
                                <td className="py-2 px-6"></td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Brand</td>
                                <td className="py-2 px-6">Royal Kludge</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Model</td>
                                <td className="py-2 px-6">Royal Kludge RK71</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Style & Size</td>
                                <td className="py-2 px-6">Ergonomic</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Type</td>
                                <td className="py-2 px-6">Mechanical Gaming Keyboard</td>
                            </tr>
                            <tr className="border-b">
                                <th className="py-2 px-6 font-medium text-gray-900">
                                    Language
                                </th>
                                <td className="py-2 px-6"></td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Language (English)</td>
                                <td className="py-2 px-6">Yes</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Language (Bangla)</td>
                                <td className="py-2 px-6">No</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Connection Type</td>
                                <td className="py-2 px-6">Both</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Interface</td>
                                <td className="py-2 px-6">Bluetooth & USB</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Lighting</td>
                                <td className="py-2 px-6">Yes</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Lighting Type</td>
                                <td className="py-2 px-6">RGB</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Fingerprint Sensor</td>
                                <td className="py-2 px-6">No</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Mechanical (Key)</td>
                                <td className="py-2 px-6">Yes</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Switch Type</td>
                                <td className="py-2 px-6">Brown Switch</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Combo Package</td>
                                <td className="py-2 px-6">Keyboard only</td>
                            </tr>
                            <tr className="border-b">
                                <th className="py-2 px-6 font-medium text-gray-900">
                                    Technical Info
                                </th>
                                <td className="py-2 px-6"></td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Number of Buttons</td>
                                <td className="py-2 px-6">71</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Scrolling Control</td>
                                <td className="py-2 px-6">No</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Wheel</td>
                                <td className="py-2 px-6">No</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">2X Click</td>
                                <td className="py-2 px-6">No</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 px-6">Click Sound</td>
                                <td className="py-2 px-6">Yes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Similar Products</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-4 bg-white border rounded-lg shadow">
                        <div className="mb-2">Rapoo V700RGB Alloy RGB Backlit Wired</div>
                        <div className="text-gray-500">Tk 4,200</div>
                        <button className="w-full py-2 mt-2 text-white bg-green-500 rounded">
                            Add to Cart
                        </button>
                    </div>
                    <div className="p-4 bg-white border rounded-lg shadow">
                        <div className="mb-2">
                            Rapoo V500PRO USB Cyan Blue Backlit Wired
                        </div>
                        <div className="text-gray-500">Tk 4,300</div>
                        <button className="w-full py-2 mt-2 text-white bg-green-500 rounded">
                            Add to Cart
                        </button>
                    </div>
                    <div className="p-4 bg-white border rounded-lg shadow">
                        <div className="mb-2">
                            Meetion MT-MK01 USB Black RGB Backlit Mech
                        </div>
                        <div className="text-gray-500">Tk 3,450</div>
                        <button className="w-full py-2 mt-2 text-white bg-green-500 rounded">
                            Add to Cart
                        </button>
                    </div>
                    <div className="p-4 bg-white border rounded-lg shadow">
                        <div className="mb-2">
                            Rapoo VPRO V500PRO Backlit Wired Purple Me
                        </div>
                        <div className="text-gray-500">Tk 4,100</div>
                        <button className="w-full py-2 mt-2 text-white bg-green-500 rounded">
                            Add to Cart
                        </button>
                    </div>
                    <div className="p-4 bg-white border rounded-lg shadow">
                        <div className="mb-2">
                            Royal Kludge RK61 Dual Mode RGB Red Switch
                        </div>
                        <div className="text-gray-500">Tk 3,800</div>
                        <button className="w-full py-2 mt-2 text-white bg-green-500 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductSpecifications;