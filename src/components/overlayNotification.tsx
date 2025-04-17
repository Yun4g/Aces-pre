// 'use client';

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import
// const NotificationOverlay = () => {
//   const dispatch = useDispatch();
//   const { open, list } = useSelector((state: RootState) => state.notifications);

//   if (!open) return null;

//   return (
//     <div className="absolute right-2 top-16 w-96 bg-white rounded-lg shadow-xl z-50 border">
//       <div className="p-4 border-b flex justify-between items-center">
//         <h3 className="font-semibold text-gray-800">Notifications</h3>
//         <button onClick={() => dispatch(toggleNotification())}>&times;</button>
//       </div>
//       <div className="max-h-80 overflow-y-auto divide-y">
//         {list.map((item) => (
//           <div key={item.id} className="p-4">
//             <p className="font-medium text-sm text-gray-700">{item.title}</p>
//             <p className="text-xs text-gray-500">{item.message}</p>
//             <span className="text-[10px] text-gray-400">{item.timestamp}</span>
//           </div>
//         ))}
//       </div>
//       <div className="p-2 text-right">
//         <button
//           onClick={() => dispatch(markAllAsRead())}
//           className="text-xs text-blue-600 hover:underline"
//         >
//           Mark all as read
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NotificationOverlay;
