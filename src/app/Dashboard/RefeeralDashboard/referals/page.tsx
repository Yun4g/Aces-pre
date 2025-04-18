'use client';

import React, { useState } from 'react';
import { Mail, MessageCircle, FileText, Layers } from 'lucide-react';
import Image from 'next/image';
import DashboardHeader from '@/components/DashBoardHeader';
import NavbarReferal from '../navbarReferal';
import clsx from 'clsx';

// All Tickets Component
function AllTickets() {
    const allTicketsData = [
        { referId: 'ARC-192', subjects: 'Academic Intervention Referral', priority: 'Low', type: 'Academics', assignee: 'Guy Hawkins', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'High', type: 'Special Features', assignee: 'Courtney Henry', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Medium', type: 'Behavioural', assignee: 'Jenny Wilson', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'High', type: 'Behavioural', assignee: 'Floyd Miles', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'High', type: 'Sociate', assignee: 'Theresa Webb', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Medium', type: 'Special Features', assignee: 'Kristin Watson', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'High', type: 'Behavioural', assignee: 'Savannah Nguyen', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Medium', type: 'Special Features', assignee: 'Dianne Russell', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Low', type: 'Sociate', assignee: 'Eleanor Pena', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'High', type: 'Sociate', assignee: 'Dianne Russell', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Medium', type: 'Special Features', assignee: 'Jenny Wilson', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Low', type: 'Sociate', assignee: 'Marin McKinney', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'High', type: 'Behavioural', assignee: 'Brooklyn Simmons', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Medium', type: 'Behavioural', assignee: 'Ralph Edwards', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Low', type: 'Special Features', assignee: 'Arlene McCoy', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'High', type: 'Behavioural', assignee: 'Annette Black', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Medium', type: 'Special Features', assignee: 'Dianne Russell', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'Low', type: 'Behavioural', assignee: 'Cody Fisher', dateCreated: '11/19/2025, 11:34pm' },
        { referId: 'ARC-192', subjects: 'My subject for this Projects', priority: 'High', type: 'Special Features', assignee: 'Jerome Bell', dateCreated: '11/19/2025, 11:34pm' },
    ];

    function priorityClass(priority: any) {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="p-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Refer ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Subjects
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Priority
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Assignee
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date Created
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allTicketsData.map((ticket) => (
                        <tr key={ticket.referId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4">{ticket.referId}</td>
                            <td className="px-6 py-4">{ticket.subjects}</td>
                            <td className="px-6 py-4">
                                <span className={clsx(
                                    'text-xs font-medium mr-2 px-2.5 py-0.5 rounded',
                                    priorityClass(ticket.priority)
                                )}>
                                    {ticket.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4">{ticket.type}</td>
                            <td className="px-6 py-4">{ticket.assignee}</td>
                            <td className="px-6 py-4">{ticket.dateCreated}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                        <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

// Conversation Component
function Conversation() {
    const conversationData = [
        { createdby: 'Courtney Henry', comment: 'workflow step assigned to pupil services Referral Group' },
        { createdby: 'System', comment: 'Workflow step assigned to pupil services Referral Group' },
        { createdby: 'System.', comment: "Hi Issac, thanks for your referral. To better assist Samuel Johnson, can you share specific incidents or patterns you've noticed? Any feedback from parents?", },
        { createdby: 'PSS', comment: "Hi Issac, thanks for your referral. To better assist Samuel Johnson, can you share specific incidents or patterns you've noticed? Any feedback from parents?", },
        { createdby: 'System.', comment: "Hi Issac, thanks for your referral. To better assist Samuel Johnson, can you share specific incidents or patterns you've noticed? Any feedback from parents?", },
        { createdby: 'System', comment: "Just took my kids to keep an eye on their progress and update you'll needed", },
        { createdby: 'PSS', comment: "hi Adam", },
    ];

    return (
        <div className="p-4">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {conversationData.map((comment) => (
                    <li key={comment.createdby} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <Image className="w-8 h-8 rounded-full" src="/assest/landGirl.png" alt="Neil image" width={50} height={50} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                    {comment.createdby}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {comment.comment}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                11:45am
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <div className="mt-2 rounded-lg shadow-sm">
                    <label htmlFor="comment" className="sr-only">Your comment</label>
                    <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows={4} className="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 border-t dark:border-gray-600">
                        <div className="flex pl-0 space-x-1 sm:pl-2">
                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 0H2a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V2a2 2 0 00-2-2zM6 6.318V10a1 1 0 01-1 1H3a1 1 0 01-1-1V7.318a1 1 0 01.682-.948l3-2a1 1 0 011.318.948zM10 9.253V14h3.768a.958.958 0 00-.278-.461l-3-2a1 1 0 00-1.19 0l-3 2a.958.958 0 00-.278.461H6V6.747l3-2 3 2v2.506l-3 2z" /></svg>
                                <span className="sr-only">Attach file</span>
                            </button>
                        </div>
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Post comment
                        </button>
                    </div>
                </div>
            </div>
            <div>
                details assigned: Sarah johnson
                deparment:Sarah johnson
                Category:Behavioural
                requester Assigned: Sarah johnson
                Districts:Design studio
                phone:(655)122-5557
            </div>
            related Referrals
            ARC 192
            ARC 192
        </div>
    );
}

// Task Component
function Task() {
    const taskData = [
        { referralInformation: 'High', lastupdated: '2 hours ago', submitted: 'Submitted', UnderReview: 'Under Review', Processing: 'Processing', Completed: 'Completed' },
    ];

    return (
        <div className="p-4">
            referral Information
            high
            integrety
            Submitted:
            Under Review:
            Processings:
            Completed:
            Student Details:
            Student's Name
            Grade Level
            Type
            Priority
            Program Assistants
            Manage program assignments for students referrals
            Current assignments
            Special Education Program
            Current Assignments:
            Special Education Program
            assign program
            reassign
        </div>
    );
}

// Activity Logs Component
function ActiveLogs() {
    const ActiveLogsData = [
        { name: 'workflow step assigned to pupil services Referral Group' },
        { name: 'Workflow step assigned to pupil services Referral Group' },
    ];

    return (
        <div className="p-4">
            activities
            Activities logs
            workflow step assigned to pupil services Referral Group
            Workflow step assigned to pupil services Referral Group
        </div>
    );
}

const TABS = [
    { key: 'all', label: 'All tickets', component: <AllTickets /> },
    { key: 'conversation', label: 'Conversation', component: <Conversation /> },
    { key: 'task', label: 'Task', component: <Task /> },
    { key: 'logs', label: 'Activity Logs', component: <ActiveLogs /> },
];

export default function ReferralTabs() {
    const [selected, setSelected] = useState('task');

    const getComponent = (key: any) => {
        const tab = TABS.find((t) => t.key === key);
        return tab ? tab.component : null;
    };

    return (
        <div className="bg-[#F1F1F1] min-h-screen flex">
            <div className={`fixed top-0 left-0 h-full w-[250px] bg-white z-50 shadow-md border-r transform transition-transform duration-300 ease-in-out md:translate-x-0`}>
                <NavbarReferal isOpen={false} onClose={() => { }} />
            </div>

            <section className="flex-1 ml-0 md:ml-[250px] p-4 overflow-y-auto w-">
                <DashboardHeader />

                <div className="container bg-white p-3 mx-auto">
                    <div className="w-full">
                        <div className="flex items-center justify-between border-b pb-2">
                            {/* Tabs */}
                            <div className="flex items-center space-x-2">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setSelected(tab.key)}
                                        className={`flex items-center px-2 py-1.5 text-sm font-medium transition
                ${selected === tab.key
                                                ? 'text-blue-600 border-b-2 border-blue-600'
                                                : 'text-gray-500 hover:text-blue-600'}
              `}
                                    >
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                            {/* New Referral Button */}
                            <button className="bg-blue-600 text-white rounded px-4 py-1.5 text-sm font-medium hover:bg-blue-700 transition">
                                New Referral
                            </button>
                        </div>
                        {/* Tab Content */}
                        <div>{getComponent(selected)}</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
