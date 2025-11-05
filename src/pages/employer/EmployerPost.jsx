import React, { useEffect, useState } from 'react';
import { createJob, getJobDetail, updateJob } from '../../services/jobService';

const EmployerPost = ({ mode = 'create', jobId = null, onDone }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [jobType, setJobType] = useState('PART_TIME');
    const [startAt, setStartAt] = useState('');
    const [deadline, setDeadline] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [salaryUnit, setSalaryUnit] = useState('buổi');
    const [workingHours, setWorkingHours] = useState('');
    const [workingDays, setWorkingDays] = useState('');
    const [workMode, setWorkMode] = useState('ONSITE');
    const [category, setCategory] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const PHONE_MAX_LEN = 11;
    const PHONE_MIN_LEN = 10; // Chuẩn VN hiện tại đa số là 10 số
    const [saving, setSaving] = useState(false);
    const [loaded, setLoaded] = useState(!(mode === 'edit' && jobId));
    const [success, setSuccess] = useState(null);
    const [errors, setErrors] = useState({});

    const toLocalInput = (isoString) => {
        if (!isoString) return '';
        try {
            const d = new Date(isoString);
            const tzOffsetMin = d.getTimezoneOffset();
            const local = new Date(d.getTime() - tzOffsetMin * 60000);
            return local.toISOString().slice(0, 16);
        } catch {
            return String(isoString).slice(0, 16);
        }
    };

    const reset = () => {
        setTitle('');
        setLocation('');
        setSalary('');
        setDescription('');
        setSkills('');
        setJobType('PART_TIME');
        setStartAt('');
        setDeadline('');
        setCompanyName('');
        setSalaryUnit('buổi');
        setWorkingHours('');
        setWorkingDays('');
        setWorkMode('ONSITE');
        setCategory('');
        setContactPhone('');
    };

 
    useEffect(() => {
        const load = async () => {
            if (!jobId) return;
            try {
                const res = await getJobDetail(jobId);
                const j = res?.data?.data || res?.data;
                if (!j) return;
                setTitle(j.title || '');
                setLocation(j.location || '');
                setSalary(j.salary ?? '');
                setDescription(j.description || '');
                setSkills(j.skills || '');
                setJobType(j.jobType || 'PART_TIME');
                setStartAt(toLocalInput(j.startAt));
                setDeadline(toLocalInput(j.deadline));
                setCompanyName(j.companyName || '');
                setSalaryUnit(j.salaryUnit || 'buổi');
                setWorkingHours(j.workingHours || '');
                setWorkingDays(j.workingDays || '');
                setWorkMode(j.workMode || 'ONSITE');
                setCategory(j.category || '');
                setContactPhone(j.contactPhone || '');
            } catch {  }
            finally {
                setLoaded(true);
            }
        }
        load()
    }, [jobId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'edit' && !loaded) {
            setSuccess({ type: 'error', message: 'Đang tải dữ liệu công việc, vui lòng đợi...' });
            return;
        }
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Tiêu đề là bắt buộc.';
        if (!location.trim()) newErrors.location = 'Địa điểm là bắt buộc.';
        if (!salary.toString().trim()) newErrors.salary = 'Mức lương là bắt buộc.';
        if (!companyName.trim()) newErrors.companyName = 'Tên công ty/tổ chức là bắt buộc.';
        if (!contactPhone.trim()) newErrors.contactPhone = 'Số điện thoại là bắt buộc.';
        const phoneDigits = contactPhone.replace(/\D/g, '');
        if (phoneDigits.length < PHONE_MIN_LEN || phoneDigits.length > PHONE_MAX_LEN) {
            newErrors.contactPhone = `Số điện thoại phải từ ${PHONE_MIN_LEN}-${PHONE_MAX_LEN} số.`;
        }
        if (!deadline.trim()) newErrors.deadline = 'Hạn nhận hồ sơ là bắt buộc.';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setSuccess({ type: 'error', message: 'Vui lòng điền các trường bắt buộc.' });
            return;
        }

        const payload = {
            title: title.trim(),
            description: description.trim(),
            location: location.trim(),
            salary: Number(salary),
            jobType,
            startAt: startAt ? new Date(startAt).toISOString() : null,
            deadline: new Date(deadline).toISOString(),
            skills: skills.trim(),
            companyName: companyName.trim(),
            salaryUnit,
            workingHours: workingHours.trim(),
            workingDays: workingDays.trim(),
            workMode,
            category: category.trim(),
            contactPhone: contactPhone.replace(/\D/g, '').slice(0, PHONE_MAX_LEN),
        };

        setSaving(true);
        try {
            const res = mode === 'edit' && jobId ? await updateJob(jobId, payload) : await createJob(payload);
            const ok = res?.data?.code === 1000 || res?.status === 200 || res?.status === 201;
            
            if (ok) {
                setSuccess({ type: 'success', message: mode === 'edit' ? 'Đã cập nhật tin.' : 'Đã đăng tin thành công.' });
                reset();
                setErrors({});
                if (onDone) onDone();
            } else {
                setSuccess({ type: 'error', message: res?.data?.message || 'Tạo tin thất bại.' });
            }
        } catch (err) {
            setSuccess({ type: 'error', message: err?.response?.data?.message || 'Có lỗi khi gọi API.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">{mode === 'edit' ? 'Chỉnh sửa tin tuyển dụng' : mode === 'view' ? 'Xem tin tuyển dụng' : 'Đăng tin tuyển dụng'}</h2>
                <p className="text-gray-600 mt-1">Điền thông tin bên dưới để {mode === 'edit' ? 'cập nhật' : mode === 'view' ? 'xem' : 'đăng'} tin tuyển dụng.</p>
            </div>

            {success && (
                <div className={`mb-4 px-4 py-2 rounded ${success.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {success.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'edit' && !loaded && (
                    <div className="mb-2 text-sm text-gray-500">Đang tải dữ liệu công việc...</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề <span className="text-red-500">*</span></label>
                        <input value={title} onChange={e => setTitle(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className={`mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.title ? 'border-red-300' : 'border-gray-200'}`} placeholder="Ví dụ: Frontend Developer Intern" />
                        {errors.title && <div className="text-xs text-red-600 mt-1">{errors.title}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Địa điểm <span className="text-red-500">*</span></label>
                        <input value={location} onChange={e => setLocation(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className={`mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.location ? 'border-red-300' : 'border-gray-200'}`} placeholder="Ví dụ: Hà Nội" />
                        {errors.location && <div className="text-xs text-red-600 mt-1">{errors.location}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mức lương (VND) <span className="text-red-500">*</span></label>
                        <input type="number" min="0" value={salary} onChange={e => setSalary(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className={`mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.salary ? 'border-red-300' : 'border-gray-200'}`} placeholder="Ví dụ: 250000" />
                        {errors.salary && <div className="text-xs text-red-600 mt-1">{errors.salary}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Đơn vị lương</label>
                        <input value={salaryUnit} onChange={e => setSalaryUnit(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className="mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="buổi/giờ/tháng" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hình thức</label>
                        <select value={jobType} onChange={e => setJobType(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                            <option value="PART_TIME">Bán thời gian</option>
                            <option value="FULL_TIME">Toàn thời gian</option>
                            <option value="FREELANCE">Freelance</option>
                            <option value="INTERNSHIP">Thực tập</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bắt đầu</label>
                        <input type="datetime-local" value={startAt} onChange={e => setStartAt(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className="mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hạn nhận hồ sơ <span className="text-red-500">*</span></label>
                        <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className={`mt-1 block w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.deadline ? 'border-red-300' : 'border-gray-200'}`} />
                        {errors.deadline && <div className="text-xs text-red-600 mt-1">{errors.deadline}</div>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Mô tả công việc <span className="text-gray-400 text-xs">(mô tả ngắn)</span></label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} rows={6} maxLength={1200} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Mô tả ngắn về công việc, nhiệm vụ..." />
                    <div className="text-xs text-gray-400 mt-1">{description.length}/1200 ký tự</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Kỹ năng (phân tách bởi dấu phẩy)</label>
                        <input value={skills} onChange={e => setSkills(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Tiếng Anh, Giao tiếp" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Công ty/Tổ chức <span className="text-red-500">*</span></label>
                        <input value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className={`mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.companyName ? 'border-red-300' : ''}`} placeholder="Trung tâm Anh ngữ ILA" />
                        {errors.companyName && <div className="text-xs text-red-600 mt-1">{errors.companyName}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngày làm việc</label>
                        <input value={workingDays} onChange={e => setWorkingDays(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Thứ 2, 4, 6" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Giờ làm việc</label>
                        <input value={workingHours} onChange={e => setWorkingHours(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="19:00-21:00" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hình thức làm</label>
                        <select value={workMode} onChange={e => setWorkMode(e.target.value)} disabled={mode === 'view' || (mode === 'edit' && !loaded)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
                            <option value="ONSITE">Làm tại chỗ</option>
                            <option value="REMOTE">Từ xa</option>
                            <option value="HYBRID">Kết hợp</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lĩnh vực</label>
                        <input value={category} onChange={e => setCategory(e.target.value)} disabled={mode === 'view'} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Giáo dục" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Số điện thoại liên hệ <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={PHONE_MAX_LEN}
                            value={contactPhone}
                            onChange={e => {
                                const digits = e.target.value.replace(/\D/g, '').slice(0, PHONE_MAX_LEN);
                                setContactPhone(digits);
                            }}
                            disabled={mode === 'view' || (mode === 'edit' && !loaded)}
                            className={`mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${errors.contactPhone ? 'border-red-300' : ''}`}
                            placeholder="0123456789"
                        />
                        {errors.contactPhone && <div className="text-xs text-red-600 mt-1">{errors.contactPhone}</div>}
                    </div>
                </div>

                {mode !== 'view' ? (
                    <div className="flex items-center gap-3">
                        <button type="submit" disabled={saving || (mode === 'edit' && !loaded)} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded hover:from-indigo-600 hover:to-blue-700 disabled:opacity-60 shadow">
                            {saving ? 'Đang lưu...' : (mode === 'edit' ? (loaded ? 'Cập nhật' : 'Đang tải...') : 'Đăng tin')}
                        </button>
                        <button type="button" onClick={reset} className="inline-flex items-center px-4 py-2 border border-gray-200 rounded bg-white">Làm lại</button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => onDone && onDone()} className="inline-flex items-center px-4 py-2 border border-gray-200 rounded bg-white">Quay lại</button>
                    </div>
                )}
            </form>

            <div className="mt-6 text-sm text-gray-500">Tin đăng sẽ được gửi lên hệ thống. Sau khi tạo, bạn có thể xem tại mục Quản lý tin tuyển dụng.</div>
        </div>
    );
};

export default EmployerPost;
