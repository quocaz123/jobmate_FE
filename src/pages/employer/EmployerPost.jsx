import React, { useState } from 'react';

const EmployerPost = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [status, setStatus] = useState('Đang tuyển');
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(null);
    const [errors, setErrors] = useState({});

    const reset = () => {
        setTitle('');
        setLocation('');
        setSalary('');
        setDescription('');
        setRequirements('');
        setStatus('Đang tuyển');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Tiêu đề là bắt buộc.';
        if (!location.trim()) newErrors.location = 'Địa điểm là bắt buộc.';
        if (!salary.trim()) newErrors.salary = 'Mức lương là bắt buộc.';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setSuccess({ type: 'error', message: 'Vui lòng điền các trường bắt buộc.' });
            return;
        }

        const job = {
            id: Date.now(),
            title: title.trim(),
            location: location.trim(),
            salary: salary.trim(),
            description: description.trim(),
            requirements: requirements.trim(),
            applicants: 0,
            status,
        };

        setSaving(true);
        // mock save to localStorage to persist across reloads for now
        setTimeout(() => {
            try {
                const key = 'jobmate_posted_jobs';
                const existing = JSON.parse(localStorage.getItem(key) || '[]');
                existing.unshift(job);
                localStorage.setItem(key, JSON.stringify(existing));
                setSuccess({ type: 'success', message: 'Đã đăng tin thành công.' });
                reset();
                setErrors({});
            } catch (err) {
                console.error(err);
                setSuccess({ type: 'error', message: 'Có lỗi khi lưu tin.' });
            } finally {
                setSaving(false);
            }
        }, 700);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Đăng tin tuyển dụng</h2>
                <p className="text-gray-600 mt-1">Điền thông tin bên dưới để đăng tin tuyển dụng.</p>
            </div>

            {success && (
                <div className={`mb-4 px-4 py-2 rounded ${success.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {success.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề <span className="text-red-500">*</span></label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className={`mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-200 ${errors.title ? 'border-red-300' : 'border-gray-200'}`} placeholder="Ví dụ: Frontend Developer Intern" />
                        {errors.title && <div className="text-xs text-red-600 mt-1">{errors.title}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Địa điểm <span className="text-red-500">*</span></label>
                        <input value={location} onChange={e => setLocation(e.target.value)} className={`mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-200 ${errors.location ? 'border-red-300' : 'border-gray-200'}`} placeholder="Ví dụ: Hà Nội" />
                        {errors.location && <div className="text-xs text-red-600 mt-1">{errors.location}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mức lương <span className="text-red-500">*</span></label>
                        <input value={salary} onChange={e => setSalary(e.target.value)} className={`mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-200 ${errors.salary ? 'border-red-300' : 'border-gray-200'}`} placeholder="Ví dụ: 8-12 triệu/tháng" />
                        {errors.salary && <div className="text-xs text-red-600 mt-1">{errors.salary}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-200">
                            <option>Đang tuyển</option>
                            <option>Đã đóng</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả công việc <span className="text-gray-400 text-xs">(mô tả ngắn)</span></label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} maxLength={1200} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200" placeholder="Mô tả ngắn về công việc, nhiệm vụ, công nghệ..." />
                    <div className="text-xs text-gray-400 mt-1">{description.length}/1200 ký tự</div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Yêu cầu <span className="text-gray-400 text-xs">(mỗi yêu cầu xuống dòng)</span></label>
                    <textarea value={requirements} onChange={e => setRequirements(e.target.value)} rows={4} maxLength={800} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-200" placeholder="Kinh nghiệm, kỹ năng, học vấn..." />
                    <div className="text-xs text-gray-400 mt-1">{requirements.length}/800 ký tự</div>
                </div>

                <div className="flex items-center gap-3">
                    <button type="submit" disabled={saving} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded hover:from-teal-700 hover:to-teal-600 disabled:opacity-60 shadow">
                        {saving ? 'Đang lưu...' : 'Đăng tin'}
                    </button>
                    <button type="button" onClick={reset} className="inline-flex items-center px-4 py-2 border border-gray-200 rounded bg-white">Làm lại</button>
                </div>
            </form>

            <div className="mt-6 text-sm text-gray-500">Tin đăng sẽ được lưu tạm vào localStorage (demo). Bạn có thể mở phần Quản lý tin tuyển dụng để thấy danh sách.</div>
        </div>
    );
};

export default EmployerPost;
